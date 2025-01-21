import { Request, Response } from 'express';
import Property from '../models/property';
import { PropertyType } from '../shared/types';
import cloudinary from 'cloudinary';

export const getAllProperties = async (req: Request, res: Response) => {
	try {
		const property = await Property.find({ userId: req.userId });
		res.json(property);
	} catch (error) {
		console.log('Error getting properties:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const getProperty = async (req: Request, res: Response) => {
	const id = req.params.id;

	try {
		const property = await Property.findOne({
			_id: id,
			userId: req.userId,
		});

		res.json(property);
	} catch (error) {
		console.log('Error getting property:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const addProperty = async (req: Request, res: Response) => {
	try {
		const imageFiles = req.files as Express.Multer.File[];
		const newProperty: PropertyType = req.body;

		const imageUrls = await uploadImages(imageFiles);

		newProperty.imageUrls = imageUrls;
		newProperty.updatedAt = new Date();
		newProperty.userId = req.userId;

		const property = new Property(newProperty);
		await property.save();

		res.status(201).send(property);
	} catch (error) {
		console.log('Error creating property:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const updateProperty = async (req: Request, res: Response) => {
	try {
		const updatedProperty: PropertyType = req.body;
		updatedProperty.updatedAt = new Date();

		const property = await Property.findOneAndUpdate(
			{
				_id: req.params.propertyId,
				userId: req.userId,
			},
			updatedProperty,
			{ new: true },
		);

		if (!property) {
			res.status(404).json({ message: 'Property not found' });
			return;
		}

		const files = req.files as Express.Multer.File[];
		const updatedImages = await uploadImages(files);

		property.imageUrls = [...updatedImages, ...(updatedProperty.imageUrls || [])];

		await property.save();

		res.status(201).json(property);
	} catch (error) {
		console.log('Error updating property:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const deleteProperty = async (req: Request, res: Response) => {
	const id = req.params.propertyId;

	try {
		const property = await Property.findOneAndDelete({
			_id: id,
			userId: req.userId,
		});

		if (!property) {
			res.status(404).json({ message: 'Property not found' });
			return;
		}

		res.status(200).json({ message: 'Property deleted successfully', property });
	} catch (error) {
		console.log('Error deleting property:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

// Uploads images to cloudinary
async function uploadImages(imageFiles: Express.Multer.File[]): Promise<string[]> {
	const uploadPromises = imageFiles.map(async img => {
		const b64 = Buffer.from(img.buffer).toString('base64');
		let dataURI = 'data:' + img.mimetype + ';base64,' + b64;

		const response = await cloudinary.v2.uploader.upload(dataURI);
		return response.url;
	});

	const imageUrls = await Promise.all(uploadPromises);
	return imageUrls;
}
