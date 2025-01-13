import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { HiOutlineStar } from 'react-icons/hi2';
import BookInfoForm from '../forms/bookInfoForm/BookInfoForm';

const PropertyDetail = () => {
	const { propertyId } = useParams();

	const { data: property } = useQuery('getPropertyById', () => apiClient.getPropertyById(propertyId as string), {
		enabled: !!propertyId,
	});

	if (!property) {
		return <div>Loading...</div>;
	}

	return (
		<div className='space-y-6 mt-5 mb-5'>
			{/* title */}
			<div>
				<span className='flex'>
					{Array.from({ length: property.starRating }).map(() => (
						<HiOutlineStar className='fill-yellow-400 text-yellow-400' />
					))}
				</span>
				<h1 className='text-3xl font-syne font-semibold'>{property.name}</h1>
			</div>

			{/* img grid */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
				{property.imageUrls.map(img => (
					<div className='h-[300px]'>
						<img src={img} alt={property.name} className='w-full h-full object-cover object-center rounded-md' />
					</div>
				))}
			</div>

			{/* facilities */}
			<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2'>
				{property.facilities.map(facility => (
					<div className='text-sm font-light text-slate-600 bg-slate-100 rounded-full px-3 py-2 text-center'>{facility}</div>
				))}
			</div>

			{/* description and bookingInfo */}
			<div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5'>
				<div className='whitespace-pre-line'>{property.description}</div>
				<div className='h-fit'>
					{' '}
					<BookInfoForm propertyId={property._id} pricePerNight={property.pricePerNight} />{' '}
				</div>
			</div>
		</div>
	);
};

export default PropertyDetail;
