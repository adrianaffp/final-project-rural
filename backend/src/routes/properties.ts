import express from 'express';
import { param } from 'express-validator';

import verifyToken from '../middleware/auth';
import { createBooking, createPaymentIntent, getProperties, getPropertyById, getSearchProperties } from '../controllers/properties-controller';

const router = express.Router();

// api/properties

router.get('/search', getSearchProperties);

router.get('/', getProperties);

router.get('/:id', [param('id').notEmpty().withMessage('Property id is required')], getPropertyById);

router.post('/:propertyId/bookings/payment-intent', verifyToken, createPaymentIntent);

router.post('/:propertyId/bookings', verifyToken, createBooking);

export default router;
