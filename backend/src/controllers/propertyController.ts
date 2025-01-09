import { Request, Response } from 'express';
import Property, { PropertyType } from '../models/property';
import cloudinary from 'cloudinary';

export const addProperty = async (req: Request, res: Response) => {
    try {
			const imageFiles = req.files as Express.Multer.File[];
			const newProperty: PropertyType = req.body;

			const uploadPromises = imageFiles.map(async img => {
				const b64 = Buffer.from(img.buffer).toString('base64');
				let dataURI = 'data:' + img.mimetype + ';base64,' + b64;

				const response = await cloudinary.v2.uploader.upload(dataURI);
				return response.url;
			});

			const imageUrls = await Promise.all(uploadPromises);

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
