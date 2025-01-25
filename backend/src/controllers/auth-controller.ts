import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user';

export const loginUser = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ message: errors.array() });
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(400).json({ message: 'Invalid credentials' });
			return;
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			res.status(400).json({ message: 'Invalid credentials' });
			return;
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });

		res.cookie('auth_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.status(200).json({ userId: user._id });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const validateUserToken = (req: Request, res: Response) => {
	res.status(200).send({ userId: req.userId });
};

export const logoutUser = (req: Request, res: Response) => {
	res.cookie('auth_token', '', {
		expires: new Date(0),
	});
	res.send();
};
