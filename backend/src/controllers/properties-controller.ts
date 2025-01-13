import { Request, Response } from 'express';
import Property from '../models/property';
import { PropertySearchResult } from '../shared/types';
import { validationResult } from 'express-validator';

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
