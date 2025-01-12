import { Link } from 'react-router-dom';
import { PropertyType } from '../../../backend/src/shared/types';
import { HiOutlineStar } from 'react-icons/hi2';

type Props = {
	property: PropertyType;
};

const SearchResultsCard = ({ property }: Props) => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-5'>
			<div className='w-full h-[300px]'>
				<img src={property.imageUrls[0]} alt={property.name} className='w-full h-full object-cover object-center' />
			</div>
			<div className='grid grid-rows-[1fr_2fr_1fr]'>
				<div>
					<div className='flex items-center'>
						<span className='flex'>
							{Array.from({ length: property.starRating }).map(() => (
								<HiOutlineStar className='fill-yellow-400 text-yellow-400' />
							))}
						</span>
						<span className='text-slate-600 ml-2 text-sm font-semibold'>{property.type}</span>
					</div>
					<Link to={`/detail/${property._id}`} className='font-syne text-2xl font-semibold cursor-pointer'>{property.name}</Link>
				</div>
				<div className='line-clamp-4 overflow-hidden max-h-[6rem]'>{property.description}</div>
				<div className='grid grid-cols-2 items-end whitespace-nowrap'>
					<div className='flex gap-1 items-center'>
						{property.facilities.slice(0, 3).map(facility => (
							<span className='text-sm font-light bg-slate-200 border border-slate-400 rounded-full px-3 py-2'>{facility}</span>
						))}
						<span className='text-sm font-light'>{property.facilities.length > 3 && `+${property.facilities.length - 3} more`}</span>
					</div>
					<div className='flex flex-col items-end gap-1'>
                        <span>{property.pricePerNight}€ per night</span>
                        <Link to={`/detail/${property._id}`} className='max-w-fit text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-12 py-2.5 mb-2 disabled:opacity-50'>View More</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchResultsCard;
