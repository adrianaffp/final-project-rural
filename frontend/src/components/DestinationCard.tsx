import { Link } from 'react-router-dom';
import { IoIosArrowRoundForward } from 'react-icons/io';

import { PropertyType } from '../../../backend/src/shared/types';

type Props = {
	property: PropertyType;
};

const DestinationCard = ({ property }: Props) => {
	return (
		<div>
			<Link to={`/detail/${property._id}`} className='relative cursor-pointer overflow-hidden rounded-xl'>
				<div className='h-[300px]'>
					<img src={property.imageUrls[0]} alt={property.name} className='w-full h-full object-cover object-center rounded-xl' />
				</div>

				<div className='absolute top-0 right-0 p-5'>
					<span className='font-light text-sm bg-white px-5 py-2 rounded-full'>{property.pricePerNight} € </span>
				</div>
				<div className='absolute bottom-0 px-6 py-16'>
					<span className='font-syne text-2xl text-white font-semibold'>{property.name}</span>
				</div>
				<div className='absolute bottom-0 p-5 '>
					<div className='flex items-center justify-between gap-2 bg-white px-5 py-2 rounded-full'>
						<span className='font-light text-sm text-slate-700'>View Details</span>
						<IoIosArrowRoundForward className='w-6 h-6 text-slate-700' />
					</div>
				</div>
			</Link>
		</div>
	);
};

export default DestinationCard;
