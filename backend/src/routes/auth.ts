import express from 'express';
import { check } from 'express-validator';

import verifyToken from '../middleware/auth';

import { loginUser, logoutUser, validateUserToken } from '../controllers/auth-controller';

const router = express.Router();

/* /api/auth */

router.post('/login', [check('email', 'Email is required').isEmail(), check('password', 'Password must be at least 6 characters').isLength({ min: 6 })], loginUser);

router.get('/validate-token', verifyToken, validateUserToken);

router.post('/logout', logoutUser);

export default router;
