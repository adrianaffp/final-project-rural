import { PaymentIntentResponse, PropertySearchResult, PropertyType, UserType } from '../../backend/src/shared/types';
import { BookingFormData } from './forms/bookingForm/BookingForm';

import { RegisterFormData } from './pages/Register';
import { SignInFormData } from './pages/SignIn';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/* --------- */
/* Users */
export const register = async (formData: RegisterFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/users/register`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}
};

export const signIn = async (formData: SignInFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	const body = await response.json();

	if (!response.ok) {
		throw new Error(body.message);
	}

	return body;
};

export const validateToken = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Invalid token');
	}

	return response.json();
};

export const getCurrentUser = async (): Promise<UserType> => {
	const response = await fetch(`${API_BASE_URL}/api/users/me`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to get current user');
	}

	return response.json();
};

export const signOut = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
		credentials: 'include',
		method: 'POST',
	});

	if (!response.ok) {
		throw new Error('Failed to sign out');
	}
};

/* --------- */
/* My-Properties */
export const getMyProperties = async (): Promise<PropertyType[]> => {
	const response = await fetch(`${API_BASE_URL}/api/my-properties`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to get properties');
	}

	return response.json();
};

export const getMyPropertyById = async (propertyId: string): Promise<PropertyType> => {
	const response = await fetch(`${API_BASE_URL}/api/my-properties/${propertyId}`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to get property');
	}

	return response.json();
};

export const listMyProperty = async (propertyFormData: FormData) => {
	const response = await fetch(`${API_BASE_URL}/api/my-properties`, {
		method: 'POST',
		credentials: 'include',
		body: propertyFormData,
	});

	if (!response.ok) {
		throw new Error('Failed to add property');
	}

	return response.json();
};

export const updateMyPropertyById = async (propertyFormData: FormData) => {
	const response = await fetch(`${API_BASE_URL}/api/my-properties/${propertyFormData.get('propertyId')}`, {
		method: 'PUT',
		credentials: 'include',
		body: propertyFormData,
	});

	if (!response.ok) {
		throw new Error('Failed to update property');
	}

	return response.json();
};

export const deleteMyPropertyById = async (propertyId: string): Promise<void> => {
	const response = await fetch(`${API_BASE_URL}/api/my-properties/${propertyId}`, {
		method: 'DELETE',
		credentials: 'include',
	});

	if (!response.ok) {
		const errorBody = await response.json();
		console.log('Error body:', errorBody);
		throw new Error('Failed to delete property');
	}

	return response.json();
};

/* --------- */
/* Search */
export type SearchParams = {
	destination?: string;
	checkIn?: string;
	checkOut?: string;
	adultCount?: string;
	childCount?: string;
	page?: string;
	facilities?: string[];
	types?: string[];
	stars?: string[];
	maxPrice?: string;
	sortOptions?: string;
};

export const searchProperty = async (searchParams: SearchParams): Promise<PropertySearchResult> => {
	const queryParams = new URLSearchParams();

	// search params
	queryParams.append('destination', searchParams.destination || '');
	queryParams.append('checkIn', searchParams.checkIn || '');
	queryParams.append('checkOut', searchParams.checkOut || '');
	queryParams.append('adultCount', searchParams.adultCount || '');
	queryParams.append('childCount', searchParams.childCount || '');
	queryParams.append('page', searchParams.page || '');

	// filtering
	queryParams.append('sortOptions', searchParams.sortOptions || '');
	queryParams.append('maxPrice', searchParams.maxPrice || '');
	searchParams.facilities?.forEach(facility => queryParams.append('facilities', facility));
	searchParams.types?.forEach(type => queryParams.append('types', type));
	searchParams.stars?.forEach(star => queryParams.append('stars', star));

	const response = await fetch(`${API_BASE_URL}/api/properties/search?${queryParams}`);

	if (!response.ok) {
		throw new Error('Failed to search properties');
	}

	return response.json();
};

export const getProperties = async (): Promise<PropertyType[]> => {
	const response = await fetch(`${API_BASE_URL}/api/properties`);

	if (!response.ok) {
		throw new Error('Failed to get properties');
	}

	return response.json();
};

export const getPropertyById = async (propertyId: string): Promise<PropertyType> => {
	const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}`);

	if (!response.ok) {
		throw new Error('Failed to get property');
	}

	return response.json();
};

/* --------- */
/* Bookings */
export const createPaymentIntent = async (propertyId: string, numOfNights: string): Promise<PaymentIntentResponse> => {
	const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/bookings/payment-intent`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ numOfNights }),
	});

	if (!response.ok) {
		throw new Error('Failed to create payment intent');
	}

	return response.json();
};

export const createPropertyBooking = async (formData: BookingFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/properties/${formData.propertyId}/bookings`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	if (!response.ok) {
		throw new Error('Failed to book property');
	}
};

export const getMyBookings = async (): Promise<PropertyType[]> => {
	const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to get bookings');
	}

	return response.json();
};

/* --------- */
/* My-Favorites */
export const getFavorites = async (): Promise<PropertyType[]> => {
	const response = await fetch(`${API_BASE_URL}/api/my-favorites`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to get favorites');
	}

	return response.json();
};

export const addFavorite = async (propertyId: string) => {
	const response = await fetch(`${API_BASE_URL}/api/my-favorites/${propertyId}`, {
		method: 'POST',
		credentials: 'include',
	});

	if (!response.ok) {
		let errorMessage = 'Failed to add favorite';
		try {
			const errorResponse = await response.json();
			errorMessage = errorResponse.message || errorMessage;
		} catch {
			// If JSON parsing fails, fallback to status text
			errorMessage = response.statusText || errorMessage;
		}
		throw new Error(errorMessage);
	}

	return response.json();
};

export const removeFavorite = async (propertyId: string) => {
	const response = await fetch(`${API_BASE_URL}/api/my-favorites/${propertyId}`, {
		method: 'DELETE',
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to remove favorite');
	}

	return response.json();
};
