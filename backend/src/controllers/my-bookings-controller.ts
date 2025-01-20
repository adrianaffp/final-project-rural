import { Request, Response } from 'express';

import Property from '../models/property';
import { PropertyType } from '../shared/types';

export const getMyBookings = async (req: Request, res: Response) => {
	try {
		const properties = await Property.find({ bookings: { $elemMatch: { userId: req.userId } } });

		// filter only users own bookings
		const results = properties.map(property => {
			const userBookings = property.bookings.filter(booking => booking.userId === req.userId);

			const propertyWithUserBookings: PropertyType = {
				...property.toObject(),
				bookings: userBookings,
			};

			return propertyWithUserBookings;
		});

		res.status(200).send(results);
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
