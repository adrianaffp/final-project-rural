import { useEffect, useState } from 'react';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import * as apiClient from '../api-client';

import { useSearchContext } from '../contexts/SearchContext';

import BookingDetails from '../components/BookingDetails';
import BookingForm from '../forms/bookingForm/BookingForm';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';

const Booking = () => {
	const { stripePromise } = useAppContext();
	const search = useSearchContext();
	const { propertyId } = useParams();

	// calc number of nights
	const [numOfNights, setNumOfNights] = useState<number>(0);

	useEffect(() => {
		if (search.checkIn && search.checkOut) {
			const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
			setNumOfNights(Math.ceil(nights));
		}
	}, [search.checkIn, search.checkOut]);

	const { data: paymentIntentData } = useQuery('createPaymentIntent', () => apiClient.createPaymentIntent(propertyId as string, numOfNights.toString()), {
		enabled: !!propertyId && numOfNights > 0,
	});

	const { data: property } = useQuery('getPropertyById', () => apiClient.getPropertyById(propertyId as string), {
		enabled: !!propertyId,
	});

	const { data: currentUser } = useQuery('getCurrentUser', apiClient.getCurrentUser);

	if (!property) {
		return <></>;
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5'>
			{/* booking details summary */}
			<BookingDetails checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} numOfNights={numOfNights} property={property} />

			{/* user details & confirm booking */}
			{currentUser && paymentIntentData && (
				<Elements stripe={stripePromise} options={{ clientSecret: paymentIntentData.clientSecret }}>
					<BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
				</Elements>
			)}
		</div>
	);
};

export default Booking;
