import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import * as apiClient from '../api-client';

import { useAppContext } from '../contexts/AppContext';

import LoadingSpinner from '../components/LoadingSpinner';

import { SlLocationPin } from 'react-icons/sl';
import { PiHouse } from 'react-icons/pi';
import { MdOutlineEuro } from 'react-icons/md';
import { HiOutlineStar } from 'react-icons/hi2';
import { LiaBedSolid } from 'react-icons/lia';
import { GoPlus, GoTrash } from 'react-icons/go';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const MyProperty = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();

	const { data: propertyData, isLoading: isLoadingProperties } = useQuery('getMyProperties', apiClient.getMyProperties, {
		onError: () => {},
	});

	const { mutate: deleteProperty, isLoading } = useMutation(apiClient.deleteMyPropertyById, {
		onSuccess: () => {
			queryClient.invalidateQueries('getMyProperties');
			showToast({ message: 'Property deleted successfully.', type: 'SUCCESS' });
		},
		onError: () => {
			showToast({ message: 'Error deleting property.', type: 'ERROR' });
		},
	});

	const handleDelete = (propertyId: string) => {
		if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
			deleteProperty(propertyId);
		}
	};

	if (isLoadingProperties) {
		return <LoadingSpinner />;
	}

	if (!propertyData || propertyData.length === 0) {
		return (
			<div className='flex justify-center items-center mt-10 text-center'>
				<span>
					No properties found. <br /> Find very good options for your stay{' '}
					<Link to='/search' className='font-semibold '>
						here
					</Link>
					!
				</span>
			</div>
		);
	}

	return (
		<div>
			<div className='flex justify-between md:items-center mb-10'>
				<h2 className='font-syne text-3xl lg:text-5xl font-semibold'>My Properties</h2>
				<Link
					to='/list-property'
					className='inline-flex items-center bg-slate-900 text-white font-light text-md hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full px-2 py-2.5'
				>
					<span className='bg-white text-slate-900 rounded-full p-2'>
						<GoPlus />
					</span>
					<span className='ml-3 pr-4 font-light'>List Property</span>
				</Link>
			</div>

			{/* property cards */}
			<div className='grid grid-cols-1 gap-6'>
				{propertyData.map(property => (
					<div className='flex flex-col gap-5 shadow-md border border-slate-100 rounded-lg p-7' key={property._id}>
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

						{/* update & delete btn */}
						<span className='flex justify-end'>
							<Link
								to={`/edit-property/${property._id}`}
								className='text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-12 py-2.5 me-2 mb-2 disabled:opacity-50'
							>
								Edit Property
							</Link>

							<button
								onClick={() => handleDelete(property._id)}
								className={`text-white bg-red-400 hover:bg-red-500 font-light rounded-full text-md px-6 py-2.5 me-2 mb-2  
									${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
								`}
							>
								{isLoading ? <HiOutlineDotsHorizontal className='w-5 h-5' /> : <GoTrash className='w-5 h-5' />}
							</button>
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyProperty;
