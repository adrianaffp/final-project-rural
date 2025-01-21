import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { IoBedOutline } from 'react-icons/io5';

import * as apiClient from '../api-client';
import DestinationCard from '../components/DestinationCard';

const HomePage = () => {
	const { data: properties } = useQuery('getProperties', () => apiClient.getProperties());

	const topProperties = properties?.slice(0, 2) || [];
	const otherProperties = properties?.slice(2, 8) || [];
	return (
		<div className='mt-32'>
			{/* types */}
			<section className='flex flex-col gap-10 md:flex-row justify-between mb-10'>
				<h3 className='text-2xl font-light lg:leading-tight'>
					rural <br />
					Portugal
				</h3>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='shadow-md rounded-xl p-7 hover:shadow-xl'>
						<span className='font-syne text-xl font-semibold'>Country House</span>
						<p className='font-light mt-2'>
							Country houses are properties located in villages and rural spaces that provide accommodation services to tourists and are integrated, due to their design construction materials and
							other characteristics, into the typical local architecture.
						</p>
					</div>
					<div className='shadow-md rounded-xl p-7 hover:shadow-xl'>
						<span className='font-syne text-xl font-semibold'>Village Tourism</span>
						<p className='font-light mt-2'>
							When five or more country houses located in the same village or parish, or in contiguous villages or parishes, are operated in an integrated manner by a single entity, they may use the
							name village tourism, without prejudice to their ownership belonging to more than one person.
						</p>
					</div>
					<div className='shadow-md rounded-xl p-7 hover:shadow-xl'>
						<span className='font-syne text-xl font-semibold'>Agritourism</span>
						<p className='font-light mt-2'>
							Agritourism enterprises are properties located on agricultural holdings that provide accommodation services to tourists and allow guests to monitor and learn about the agricultural
							activity, or participate in the work carried out there, in accordance with the rules established by the person responsible.
						</p>
					</div>
					<div className='shadow-md rounded-xl p-7 hover:shadow-xl'>
						<span className='font-syne text-xl font-semibold'>Rural Hotel</span>
						<p className='font-light mt-2'>
							Rural hotels are hotels located in rural spaces that, due to their architectural design and construction materials, respect the dominant characteristics of the region where they are
							located, and can be installed in new buildings that occupy the entire building or integrate a single architectural entity and respect the same characteristics.
						</p>
					</div>
				</div>
			</section>

			{/* latest destinations */}
			<section className='mt-32'>
				{/* header */}
				<div className='flex flex-col md:flex-row justify-between md:items-center mb-10'>
					<h2 className='font-syne text-3xl lg:text-5xl font-semibold'>Latest Destinations</h2>
					<h4 className='font-syne text-sm lg:text-base lg:max-w-[400px] text-slate-600 lg:leading-tight'>The most recent properties listed by our hosts are now available for you to explore</h4>
				</div>

				{/* properties grid */}
				<div className='grid gap-5'>
					<div className='grid md:grid-cols-2 gap-4'>
						{topProperties.map(property => (
							<DestinationCard property={property} key={property._id} />
						))}
					</div>
					<div className='grid md:grid-cols-3 gap-4'>
						{otherProperties.map(property => (
							<DestinationCard property={property} key={property._id} />
						))}
					</div>
				</div>
			</section>

			{/* discover */}
			<section className='space-y-10 mt-32 mb-20 text-center'>
				<h1 className='max-w-[1000px] mx-auto text-center font-syne text-3xl lg:text-5xl font-bold text-slate-800'>
					Ready to embark on your next adventure? Connect with rural today to start planning your dream vacation
				</h1>

				<Link
					to='/search'
					className='inline-flex items-center bg-slate-900 text-white font-light text-md hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full px-4 py-2.5 disabled:opacity-50'
				>
					<span className='bg-white text-slate-900 rounded-full p-2'>
						<IoBedOutline />
					</span>
					<span className='ml-2 mr-2 font-light'>Explore properties</span>
				</Link>
			</section>
		</div>
	);
};

export default HomePage;
