import { useState } from 'react';
import { useQuery } from 'react-query';

import { useSearchContext } from '../contexts/SearchContext';

import * as apiClient from '../api-client';

import SearchResultsCard from '../components/SearchResultsCard';
import FacilitiesFilter from '../components/searchFilters/FacilitiesFilter';
import PriceFilter from '../components/searchFilters/PriceFilter';
import StarRatingFilter from '../components/searchFilters/StarRatingFilter';
import TypesFilter from '../components/searchFilters/TypesFilter';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

import { RxDoubleArrowDown, RxDoubleArrowUp } from 'react-icons/rx';

const Search = () => {
	const search = useSearchContext();
	const [page, setPage] = useState<number>(1);

	const [selectedStars, setSelectedStars] = useState<string[]>([]);
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<number | undefined>(undefined);

	const [sortOptions, setSortOptions] = useState<string>('');
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	const searchParams = {
		destination: search.destination,
		checkIn: search.checkIn.toISOString(),
		checkOut: search.checkOut.toISOString(),
		adultCount: search.adultCount.toString(),
		childCount: search.childCount.toString(),
		page: page.toString(),
		stars: selectedStars,
		types: selectedTypes,
		facilities: selectedFacilities,
		maxPrice: selectedPrice ? selectedPrice.toString() : undefined,
		sortOptions: sortOptions,
	};

	const { data: propertyData, isLoading } = useQuery(['searchProperty', searchParams], () => apiClient.searchProperty(searchParams));

	if (isLoading) {
		return <LoadingSpinner />;
	}

	/* Search Filters Handlers */
	const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const starRating = e.target.value;

		setSelectedStars(prevStars => (e.target.checked ? [...prevStars, starRating] : prevStars.filter(star => star !== starRating)));
	};
	const handleTypesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const propertyType = e.target.value;

		setSelectedTypes(prevTypes => (e.target.checked ? [...prevTypes, propertyType] : prevTypes.filter(type => type !== propertyType)));
	};
	const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const propertyFacility = e.target.value;

		setSelectedFacilities(prevFacilities => (e.target.checked ? [...prevFacilities, propertyFacility] : prevFacilities.filter(facility => facility !== propertyFacility)));
	};

	return (
		<div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 mt-5 mb-10 lg:mb-16'>
			{/* filters */}
			<div>
				{/* toggle filters mobile */}
				<div className='flex justify-center'>
					<button className='block lg:hidden bg-white border border-slate-300 font-light text-slate-700 rounded-full text-md px-6 py-2.5 mb-1' onClick={() => setIsFiltersOpen(prev => !prev)}>
						{isFiltersOpen ? (
							<div className='flex justify-center items-center gap-3'>
								<span>Filter</span>
								<RxDoubleArrowUp className='w-3' />
							</div>
						) : (
							<div className='flex justify-center items-center gap-3'>
								<span>Filter</span>
								<RxDoubleArrowDown className='w-3' />
							</div>
						)}
					</button>
				</div>

				{/* filters */}
				<div className={`rounded-lg border border-slate-200 p-5 h-fit lg:sticky top-5  lg:block ${isFiltersOpen ? 'block' : 'hidden'}`}>
					<div className='space-y-4'>
						<h3 className='text-md font-semibold border-b border-slate-300 pb-3'>Filter</h3>
						<StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
						<TypesFilter selectedTypes={selectedTypes} onChange={handleTypesChange} />
						<FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange} />
						<PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
					</div>
				</div>
			</div>

			{/* results group */}
			<div className='flex flex-col gap-5'>
				<div className='flex justify-between items-center'>
					<span className='text-md font-syne font-semibold'>
						{propertyData?.pagination.total} Properties found {search.destination ? `in ${search.destination}` : ''}
					</span>

					{/* sort */}
					<select className='border border-slate-200 rounded-md px-5 py-2 text-sm font-light cursor-pointer' value={sortOptions} onChange={e => setSortOptions(e.target.value)}>
						<option value=''>Sort</option>
						<option value='starRating'>Star Rating</option>
						<option value='pricePerNightAsc'>Price: Low to High</option>
						<option value='pricePerNightDesc'>Price: High to Low</option>
					</select>
				</div>

				{/* search results */}
				{propertyData?.data.map(property => (
					<SearchResultsCard property={property} />
				))}

				<div>
					<Pagination page={propertyData?.pagination.page || 1} pages={propertyData?.pagination.pages || 1} onPageChange={page => setPage(page)} />
				</div>
			</div>
		</div>
	);
};

export default Search;
