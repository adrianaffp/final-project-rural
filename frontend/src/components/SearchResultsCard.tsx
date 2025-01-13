import { Link } from 'react-router-dom';
import { PropertyType } from '../../../backend/src/shared/types';
import { HiOutlineStar } from 'react-icons/hi2';
import { IoIosArrowRoundForward } from 'react-icons/io';

type Props = {
	property: PropertyType;
};

const SearchResultsCard = ({ property }: Props) => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-5'>
			{/* img */}
			<div className='w-full h-[300px]'>
				<img src={property.imageUrls[0]} alt={property.name} className='w-full h-full object-cover object-center' />
			</div>

			{/* content */}
			<div className='grid grid-rows-[1fr_2fr_1fr]'>
				{/* title section */}
				<div>
					<div className='flex items-center'>
						<span className='flex'>
							{Array.from({ length: property.starRating }).map(() => (
								<HiOutlineStar className='fill-yellow-400 text-yellow-400' />
							))}
						</span>
						<span className='text-slate-600 ml-2 text-sm font-semibold'>{property.type}</span>
					</div>
					<Link to={`/detail/${property._id}`} className='font-syne text-2xl font-semibold cursor-pointer'>
						{property.name}
					</Link>
				</div>

				{/* description & facilities section */}
				<div className='space-y-3'>
					<div className='line-clamp-4 overflow-hidden max-h-[6rem]'>{property.description}</div>

					<div className='flex gap-1 items-center'>
						{/* display 3 facilities */}
						{property.facilities.slice(0, 3).map(facility => (
							<span className='text-xs font-light text-slate-600 bg-slate-100 rounded-full px-3 py-2'>{facility}</span>
						))}

						{/* + more */}
						<span className='text-xs font-light text-slate-600 ml-2'>{property.facilities.length > 3 && `+ ${property.facilities.length - 3} more`}</span>
					</div>
				</div>

				{/* price & details btn section */}
				<div className='flex items-center justify-end gap-4'>
					<span className='font-syne text-2xl font-light'>{property.pricePerNight} € per night</span>
					<Link
						to={`/detail/${property._id}`}
						className='flex items-center gap-2 text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-4 py-2.5 disabled:opacity-50'
					>
						View Details
						<IoIosArrowRoundForward className='w-5 h-5' />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SearchResultsCard;
