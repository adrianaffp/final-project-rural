import { Request, Response } from 'express';
import Property from '../models/property';
import { BookingType, PropertySearchResult } from '../shared/types';
import { validationResult } from 'express-validator';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const getSearchProperties = async (req: Request, res: Response) => {
	try {
		const query = constructSearchQuery(req.query);

		// sorting
		let sortOptions = {};
		switch (req.query.sortOptions) {
			case 'starRating':
				sortOptions = { starRating: -1 };
				break;
			case 'pricePerNightAsc':
				sortOptions = { pricePerNight: 1 };
				break;
			case 'pricePerNightDesc':
				sortOptions = { pricePerNight: -1 };
				break;
		}

		// pagination
		const pageSize = 5;
		const pageNumber = parseInt((req.query.page as string) || '1');
		const skip = (pageNumber - 1) * pageSize;

		const properties = await Property.find(query).sort(sortOptions).skip(skip).limit(pageSize);

		const total = await Property.countDocuments(query);

		const response: PropertySearchResult = {
			data: properties,
			pagination: {
				total,
				page: pageNumber,
				pages: Math.ceil(total / pageSize),
			},
		};

		res.json(response);
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const getPropertyById = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return;
	}

	const id = req.params.id.toString();

	try {
		const property = await Property.findById(id);
		res.json(property);
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const createPaymentIntent = async (req: Request, res: Response) => {
	const { numOfNights } = req.body;
	const propertyId = req.params.propertyId;

	const property = await Property.findById(propertyId);

	if (!property) {
		res.status(400).json({ message: 'Property not found' });
		return;
	}

	const totalCost = property.pricePerNight * numOfNights;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: totalCost * 100,
		currency: 'eur',
		metadata: {
			propertyId,
			userId: req.userId,
		},
	});

	if (!paymentIntent.client_secret) {
		res.status(500).json({ message: 'Internal server error' });
		return;
	}

	const response = {
		paymentIntentId: paymentIntent.id,
		clientSecret: paymentIntent.client_secret.toString(),
		totalCost,
	};

	res.send(response);
};

export const createBooking = async (req: Request, res: Response) => {
	try {
		const paymentIntentId = req.body.paymentIntentId;

		const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

		if (!paymentIntent) {
			res.status(400).json({ message: 'Payment intent not found' });
			return;
		}

		if (paymentIntent.metadata.propertyId !== req.params.propertyId || paymentIntent.metadata.userId !== req.userId) {
			res.status(400).json({ message: 'Payment intent not found' });
			return;
		}

		if (paymentIntent.status !== 'succeeded') {
			res.status(400).json({ message: `Payment intent not succeeded. Status: ${paymentIntent.status}` });
			return;
		}

		const newBooking: BookingType = {
			...req.body,
			userId: req.userId,
			createdAt: new Date(),
		};

		const property = await Property.findOneAndUpdate(
			{ _id: req.params.propertyId },
			{
				$push: { bookings: newBooking },
			},
			{ new: true },
		);

		if (!property) {
			res.status(400).json({ message: 'Property not found' });
			return;
		}

		await property.save();
		res.status(200).send();
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// filtering
const constructSearchQuery = (queryParams: any) => {
	let constructedQuery: any = {};

	if (queryParams.destination) {
		constructedQuery.city = new RegExp(queryParams.destination, 'i');
	}

	if (queryParams.adultCount) {
		constructedQuery.adultCount = { $gte: parseInt(queryParams.adultCount) };
	}

	if (queryParams.childCount) {
		constructedQuery.childCount = { $gte: parseInt(queryParams.childCount) };
	}

	if (queryParams.facilities) {
		constructedQuery.facilities = { $all: Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities] };
	}

	if (queryParams.types) {
		constructedQuery.type = {
			$in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
		};
	}

	if (queryParams.stars) {
		const starRating = Array.isArray(queryParams.stars) ? queryParams.stars.map((star: string) => parseInt(star)) : [parseInt(queryParams.stars)];

		constructedQuery.starRating = { $in: starRating };
	}

	if (queryParams.maxPrice) {
		constructedQuery.pricePerNight = { $lte: parseInt(queryParams.maxPrice).toString() };
	}

	return constructedQuery;
};
