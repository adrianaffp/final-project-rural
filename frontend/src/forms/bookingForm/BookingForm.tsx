import { useForm } from 'react-hook-form';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import { PaymentIntentResponse, UserType } from '../../../../backend/src/shared/types';

import { useAppContext } from '../../contexts/AppContext';
import { useSearchContext } from '../../contexts/SearchContext';

import * as apiClient from '../../api-client';

type Props = {
	currentUser: UserType;
	paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
	firstName: string;
	lastName: string;
	email: string;
	propertyId: string;
	checkIn: string;
	checkOut: string;
	adultCount: number;
	childCount: number;
	totalCost: number;
	paymentIntentId: string;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
	const stripe = useStripe();
	const elements = useElements();

	const { showToast } = useAppContext();
	const search = useSearchContext();
	const { propertyId } = useParams();

	const { mutate: bookProperty, isLoading } = useMutation(apiClient.createPropertyBooking, {
		onSuccess: () => {
			showToast({ message: 'Property booked successfully!', type: 'SUCCESS' });
		},
		onError: () => {
			showToast({ message: 'Error booking property', type: 'ERROR' });
		},
	});

	const { register, handleSubmit } = useForm<BookingFormData>({
		defaultValues: {
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
			email: currentUser.email,
			propertyId: propertyId,
			checkIn: search.checkIn.toISOString(),
			checkOut: search.checkOut.toISOString(),
			adultCount: search.adultCount,
			childCount: search.childCount,
			totalCost: paymentIntent.totalCost,
			paymentIntentId: paymentIntent.paymentIntentId,
		},
	});

	const onSubmit = async (formData: BookingFormData) => {
		if (!stripe || !elements) {
			return;
		}

		const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement) as StripeCardElement,
			},
		});

		if (result.paymentIntent?.status === 'succeeded') {
			bookProperty({ ...formData, paymentIntentId: result.paymentIntent.id });
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-5 rounded-lg shadow-md border border-slate-100 p-5'>
			<h2 className='font-syne text-4xl font-light'>Confirm your Details</h2>

			{/* User Details */}
			<div className='grid grid-cols-2 gap-5'>
				<label className='flex-1 font-syne'>
					First Name
					<input className='w-full bg-slate-100 p-2 text-slate-400 rounded-xl cursor-not-allowed' type='text' readOnly disabled {...register('firstName')} />
				</label>

				<label className='flex-1 font-syne'>
					Last Name
					<input className='w-full bg-slate-100 p-2 text-slate-400 rounded-xl cursor-not-allowed' type='text' readOnly disabled {...register('lastName')} />
				</label>
			</div>
			<label className='flex-1 font-syne'>
				Email
				<input className='w-full bg-slate-100 p-2 text-slate-400 rounded-xl cursor-not-allowed' type='text' readOnly disabled {...register('email')} />
			</label>

			{/* Price Summary */}
			<div className='space-y-2 mt-5'>
				<h2 className='text-2xl font-syne'>Price Summary</h2>

				<div className='bg-slate-100 p-6 rounded-lg '>
					<div className='text-xl font-semibold'>Total Cost: {paymentIntent.totalCost.toFixed(2)}€</div>
					<div className='text-xs'>Includes taxes and charges</div>
				</div>
			</div>

			{/* Payment */}
			<div className='space-y-2 mt-5'>
				<h3 className='text-2xl font-syne font-light'>Payment Details</h3>
				<CardElement id='payment-element' className='border rounded-lg p-2 border-slate-300 text-sm' />
			</div>

			<div className='flex justify-end'>
				<button
					disabled={isLoading}
					type='submit'
					className='text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-12 py-2.5 me-2 mb-2 disabled:opacity-50'
				>
					{isLoading ? 'Confirming...' : 'Confirm Booking'}
				</button>
			</div>
		</form>
	);
};

export default BookingForm;
