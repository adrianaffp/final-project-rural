import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { IoBedOutline, IoCalendarOutline } from 'react-icons/io5';

const MyBookings = () => {
	const { data: properties } = useQuery('getMyBookings', apiClient.getMyBookings);

	if (!properties || properties.length === 0) {
		return <div>No properties found</div>;
	}

	return (
		<div>
			<div className='flex flex-col md:flex-row justify-between md:items-center mb-10'>
				<h2 className='font-syne text-3xl lg:text-5xl font-semibold'>My Bookings</h2>
				<h4 className='font-syne text-sm lg:text-base lg:max-w-[400px] text-slate-600 lg:text-end lg:leading-tight'>Explore the wonders of Portugal and create memories that will last a lifetime.</h4>
			</div>

			<div className='space-y-7 lg:space-y-12 '>
				{properties.map(property => (
					<div className='grid grid-cols-1 lg:grid-cols-2 border border-slate-100 shadow-md rounded-xl lg:gap-5'>
						{/* img */}
						<div className='lg:w-full lg:h-[370px]'>
							<img src={property.imageUrls[0]} alt={property.name} className='w-full h-full object-cover object-center rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none ' />
						</div>

						{/* info */}
						<div className='px-9 pt-9 pb-5 lg:pb-0 flex flex-col'>
							<h4 className='font-syne text-3xl'>{property.name}</h4>
							<h6 className='text-sm mb-5'>
								{property.county}, {property.region}
							</h6>

							{/* bookings */}
							<div className='overflow-y-auto max-h-[200px] lg:max-h-[240px]'>
								{property.bookings.map(booking => (
									<div className='bg-slate-100 rounded-lg py-3 px-5 mb-4'>
										{/* dates */}
										<div className='flex flex-col mb-2'>
											<span className='font-semibold text-sm mb-1'>Stay</span>

											<div className='flex items-center'>
												<IoCalendarOutline className='w-5 h-5 text-slate-700' />
												<span className='font-light ml-2'>
													{new Date(booking.checkIn).toDateString()} - {new Date(booking.checkOut).toDateString()}
												</span>
											</div>
										</div>

										{/* guests */}
										<div>
											<span className='font-semibold text-sm mb-1'>Guests</span>
											<div className='flex items-center'>
												<IoBedOutline className='w-5 h-5 text-slate-700' />
												<span className='font-light ml-2'>
													{booking.adultCount} adults, {booking.childCount} children
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyBookings;
