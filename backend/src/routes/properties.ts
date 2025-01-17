import express from 'express';
import { createBooking, createPaymentIntent, getPropertyById, getSearchProperties } from '../controllers/properties-controller';
import { param } from 'express-validator';
import verifyToken from '../middleware/auth';

const router = express.Router();

//* api/properties/search?
// get all properties
router.get('/search', getSearchProperties);

//* api/properties/:id
// get a property
router.get('/:id', [param('id').notEmpty().withMessage('Property id is required')], getPropertyById);

//* api/properties/:propertyId/bookings/payment-intent
// create payment intent
router.post('/:propertyId/bookings/payment-intent', verifyToken, createPaymentIntent);

//* api/properties/:propertyId/bookings
// create property booking
router.post('/:propertyId/bookings', verifyToken, createBooking);

export default router;
