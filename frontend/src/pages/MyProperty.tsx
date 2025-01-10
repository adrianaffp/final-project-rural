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
			<div className='flex justify-between'>
				<h1 className='font-syne text-3xl font-semibold'>My Properties</h1>
				<Link
					to='/list-property'
					className='text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-12 py-2.5 me-2 mb-2 disabled:opacity-50'
				>
					List Property
				</Link>
			</div>
			<div className='grid grid-cols-1 gap-5'>
				{propertyData.map(property => (
					<div className='flex flex-col gap-5 border-2 border-slate-200 rounded-lg p-7'>
						<h2 className='font-syne text-xl font-semibold'>{property.name}</h2>
						<div className='whitespace-pre-line'>{property.description}</div>
						<div className='grid grid-cols-5 gap-2'>
							<div className='border border-slate-200 rounded-full p-5 flex items-center justify-center gap-2'>
								<SlLocationPin />
								{property.city}
							</div>
							<div className='border border-slate-200 rounded-full p-5 flex justify-center items-center gap-2'>
								<PiHouse />
								{property.type}
							</div>
							<div className='border border-slate-200 rounded-full p-5 flex justify-center items-center gap-2'>
								<MdOutlineEuro />
								{property.pricePerNight}€ per night
							</div>
							<div className='border border-slate-200 rounded-full p-5 flex justify-center items-center gap-2'>
								<LiaBedSolid />
								{property.adultCount} adults, {property.childCount} children
							</div>
							<div className='border border-slate-200 rounded-full p-5 flex justify-center items-center gap-2'>
								<HiOutlineStar />
								{property.starRating} Star
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
