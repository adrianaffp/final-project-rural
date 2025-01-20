import express from 'express';

import verifyToken from '../middleware/auth';
import { getMyBookings } from '../controllers/my-bookings-controller';

const router = express.Router();

//* api/my-bookings
// get all user bookings
router.get('/', verifyToken, getMyBookings);

export default router;
