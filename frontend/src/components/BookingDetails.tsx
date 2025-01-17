import { PropertyType } from '../../../backend/src/shared/types';

import { IoBedOutline, IoCalendarOutline, IoMoonOutline } from 'react-icons/io5';

type Props = {
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
	numOfNights: number;
	property: PropertyType;
};

const BookingDetails = ({ checkIn, checkOut, adultCount, childCount, numOfNights, property }: Props) => {
	return (
		<div className='grid gap-4 bg-slate-50 rounded-xl border border-slate-100 shadow p-5 h-fit'>
			<h3 className='font-syne text-xl font-light text-center'>Booking Details Summary</h3>

			{/* destination */}
			<div className='border-b py-2'>
				<h4 className='font-semibold text-sm mb-1'>Destination</h4>
				<div className='font-light'>{`${property.name}, ${property.city}`}</div>
			</div>

			{/* check in & out dates */}
			<div className='flex justify-between'>
				<div>
					<h4 className='font-semibold text-sm mb-1'>Check-in</h4>
					<div className='flex items-center'>
						<IoCalendarOutline className='w-5 h-5 text-slate-700' />
						<span className='font-light ml-2'>{checkIn.toDateString()}</span>
					</div>
				</div>
				<div>
					<h4 className='font-semibold text-sm mb-1'>Check-out</h4>
					<div className='flex items-center'>
						<IoCalendarOutline className='w-5 h-5 text-slate-700' />
						<span className='font-light ml-2'>{checkOut.toDateString()}</span>
					</div>
				</div>
			</div>

			{/* stay */}
			<div className='border-t border-b py-2'>
				<h4 className='font-semibold text-sm mb-1'>Duration</h4>
				<div className='flex items-center'>
					<IoMoonOutline className='w-5 h-5 text-slate-700' />
					<span className='font-light ml-2'>{numOfNights} nights</span>
				</div>
			</div>

			{/* guests */}
			<div>
				<h4 className='font-semibold text-sm mb-1'>Guests</h4>
				<div className='flex items-center'>
					<IoBedOutline className='w-5 h-5 text-slate-700' />
					<span className='font-light ml-2'>
						{adultCount} adults, {childCount} children
					</span>
				</div>
			</div>
		</div>
	);
};

export default BookingDetails;
