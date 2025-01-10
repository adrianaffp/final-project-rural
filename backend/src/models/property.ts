import mongoose from 'mongoose';
import { PropertyType } from '../shared/types';

const propertySchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	adultCount: {
		type: Number,
		required: true,
	},
	childCount: {
		type: Number,
		required: true,
	},
	facilities: {
		type: [String],
		required: true,
	},
	starRating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	pricePerNight: {
		type: Number,
		required: true,
	},
	imageUrls: {
		type: [String],
		required: true,
	},
	updatedAt: {
		type: Date,
		required: true,
	},
});

const Property = mongoose.model<PropertyType>('Property', propertySchema);

export default Property;
