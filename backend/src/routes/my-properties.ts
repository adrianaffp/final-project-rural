import express from 'express';
import multer from 'multer';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';
import { getAllProperties, addProperty, getProperty, updateProperty } from '../controllers/my-properties-controller';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

//* api/my-properties
// get all properties
router.get('/', verifyToken, getAllProperties);

// get a property
router.get('/:id', verifyToken, getProperty);

// add property
router.post(
	'/',
	verifyToken,
	[
		body('name').notEmpty().withMessage('Name is required'),
		body('city').notEmpty().withMessage('City is required'),
		body('description').notEmpty().withMessage('Description is required'),
		body('type').notEmpty().withMessage('Type is required'),
		body('facilities').notEmpty().isArray().withMessage('Facilities are required'),
		body('procePerNight').notEmpty().isNumeric().withMessage('Price per night is required and must be a number'),
	],
	upload.array('imageFiles', 6),
	addProperty,
);

// update property
router.put('/:propertyId', verifyToken, upload.array('imageFiles'), updateProperty);

export default router;
