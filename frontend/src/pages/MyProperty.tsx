import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
import { SlLocationPin } from 'react-icons/sl';
import { PiHouse } from 'react-icons/pi';
import { MdOutlineEuro } from 'react-icons/md';
import { HiOutlineStar } from 'react-icons/hi2';
import { LiaBedSolid } from 'react-icons/lia';

const MyProperty = () => {
	const { data: propertyData } = useQuery('getMyProperties', apiClient.getMyProperties, {
		onError: () => {},
	});

	if (!propertyData) {
		return <span>No properties found</span>;
	}

	return (
		<div>
			<div className='flex justify-between md:items-center mb-10'>
				<h2 className='font-syne text-3xl lg:text-5xl font-semibold'>My Properties</h2>
				<Link
					to='/list-property'
					className='text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-12 py-2.5 me-2 mb-2 disabled:opacity-50'
				>
					List Property
				</Link>
			</div>

			{/* property cards */}
			<div className='grid grid-cols-1 gap-5'>
				{propertyData.map(property => (
					<div className='flex flex-col gap-5 shadow-md border border-slate-100 rounded-lg p-7'>
						<h2 className='font-syne text-2xl font-semibold'>{property.name}</h2>

						<h4 className='line-clamp-4 overflow-hidden max-h-[6rem] font-light'>{property.description}</h4>

						{/* details */}
						<div className='grid md:grid-cols-3 lg:grid-cols-5 gap-2 font-light mb-5'>
							<div className='flex items-center justify-center gap-2 bg-slate-100 rounded-full p-3 text-slate-600'>
								<SlLocationPin />
								{property.county}
							</div>
							<div className='flex items-center justify-center gap-2 bg-slate-100 rounded-full p-3 text-slate-600'>
								<PiHouse />
								{property.type}
							</div>
							<div className='flex items-center justify-center gap-2 bg-slate-100 rounded-full p-3 text-slate-600'>
								<MdOutlineEuro />
								{property.pricePerNight}€ per night
							</div>
							<div className='flex items-center justify-center gap-2 bg-slate-100 rounded-full p-3 text-slate-600'>
								<LiaBedSolid />
								{property.adultCount} {property.adultCount === 1 ? 'adult' : 'adults'}, {property.childCount} {property.childCount === 1 ? 'child' : 'children'}
							</div>
							<div className='flex items-center justify-center gap-2 bg-slate-100 rounded-full p-3 text-slate-600'>
								<HiOutlineStar className='fill-yellow-400 text-yellow-400' />
								{property.starRating} {property.starRating === 1 ? 'Star' : 'Stars'}
							</div>
						</div>


						<span className='flex justify-end'>
							<Link
								to={`/edit-property/${property._id}`}
								className='text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-12 py-2.5 me-2 mb-2 disabled:opacity-50'
							>
								Edit Property
							</Link>
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyProperty;
