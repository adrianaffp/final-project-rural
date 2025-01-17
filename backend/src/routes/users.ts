import express from 'express';
import { check } from 'express-validator';

import verifyToken from '../middleware/auth';
import { getCurrentUser, registerUser } from '../controllers/users-controller';


const router = express.Router();

//* /api/users/me
router.get('/me', verifyToken, getCurrentUser);

//* /api/users/register
router.post(
	'/register',
	[
		check('firstName', 'First Name is required').isString(),
		check('lastName', 'Last Name is required').isString(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
	],
	registerUser,
);

export default router;
