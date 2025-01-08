import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// /api/users/register
router.post(
	'/register',
	[
		check('firstName', 'First Name is required').isString(),
		check('lastName', 'Last Name is required').isString(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
	],
	async (req: Request, res: Response) => {
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
	},
);

export default router;
