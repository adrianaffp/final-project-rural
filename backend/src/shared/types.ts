export type UserType = {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	favorites: string[];
};

export type PropertyType = {
	_id: string;
	userId: string;
	name: string;
	region: string;
	county: string;
	description: string;
	type: string;
	adultCount: number;
	childCount: number;
	facilities: string[];
	starRating: number;
	pricePerNight: number;
	imageUrls: string[];
	updatedAt: Date;
	bookings: BookingType[];
};

export type BookingType = {
	_id: string;
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
	totalCost: number;
	createdAt: Date;
};

export type PropertySearchResult = {
	data: PropertyType[];
	pagination: {
		total: number;
		page: number;
		pages: number;
	};
};

export type PaymentIntentResponse = {
	paymentIntentId: string;
	clientSecret: string;
	totalCost: number;
};
