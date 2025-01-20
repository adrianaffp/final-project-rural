import mongoose from 'mongoose';
import { BookingType, PropertyType } from '../shared/types';

const bookingSchema = new mongoose.Schema<BookingType>({
	userId: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	checkIn: {
		type: Date,
		required: true,
	},
	checkOut: {
		type: Date,
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
	totalCost: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
	},
});

const propertySchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	region: {
		type: String,
		required: true,
	},
	county: {
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
	bookings: [bookingSchema],
});

const Property = mongoose.model<PropertyType>('Property', propertySchema);

export default Property;
