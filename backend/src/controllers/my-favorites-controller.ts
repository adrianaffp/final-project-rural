import { Request, Response } from 'express';

import User from '../models/user';

export const getFavorites = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const user = await User.findById(userId).populate('favorites');

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		res.json(user.favorites);
	} catch (error) {
		console.log('Error getting favorites:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const addFavorite = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const propertyId = req.params.propertyId;
		const user = await User.findById(userId);

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		if (user.favorites.includes(propertyId)) {
			res.status(400).json({ message: 'Property already added to favorites' });
			return;
		}

        user.favorites.push(propertyId);
		await user.save();

		const updatedUser = await User.findById(userId).populate('favorites');

		res.status(201).json(updatedUser?.favorites);
	} catch (error) {
		console.log('Error adding favorites:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const removeFavorite = async (req: Request, res: Response) => {
	try {
		const userId = req.userId;
		const propertyId = req.params.propertyId;
		const user = await User.findById(userId);

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

        user.favorites = user.favorites.filter(id => id.toString() !== propertyId);
		await user.save();

		const updatedUser = await User.findById(userId).populate('favorites');

		res.status(200).json(updatedUser?.favorites);
	} catch (error) {
		console.log('Error removing favorite:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
