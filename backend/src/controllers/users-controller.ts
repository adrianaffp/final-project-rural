import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import User from '../models/user';

export const getCurrentUser = async (req: Request, res: Response) => {
	const userId = req.userId;

	try {
		const user = await User.findById(userId).select('-password');

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		res.json(user);
	} catch (error) {
		console.log('Error getting current user:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
	}

	try {
		let user = await User.findOne({ email: req.body.email });

		if (user) {
			res.status(400).json({ message: 'User already exists' });
			return;
		}

		user = new User(req.body);
		await user.save();

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
			expiresIn: '1d',
		});

		res.cookie('auth_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.status(201).json({ message: 'User created successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: 'Internal server error' });
	}
};
