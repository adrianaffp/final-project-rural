import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import * as apiClient from '../api-client';

import DestinationCard from '../components/DestinationCard';
import LoadingSpinner from '../components/LoadingSpinner';

const MyFavorites = () => {
	const { data: properties, isLoading } = useQuery('getFavorites', apiClient.getFavorites);

	if (isLoading) {
		return (
			<LoadingSpinner />
		);
	}

	if (!properties || properties.length === 0) {
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
			<div className='flex flex-col md:flex-row justify-between md:items-center mb-10'>
				<h2 className='font-syne text-3xl lg:text-5xl font-semibold'>Favorites</h2>

				<h4 className='font-syne text-sm lg:text-base lg:max-w-[400px] text-slate-600 lg:text-end lg:leading-tight'>
					You have {properties.length} very good {properties.length === 1 ? 'property' : 'properties'} for your stay!
				</h4>
			</div>

			{/* display fav properties */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12 md:mb-20'>
				{properties.map(property => (
					<DestinationCard property={property} key={property._id} />
				))}
			</div>
		</div>
	);
};

export default MyFavorites;
