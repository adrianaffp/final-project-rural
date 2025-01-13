import { useQuery } from 'react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from '../api-client';
import { useState } from 'react';
import SearchResultsCard from '../components/SearchResultsCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/searchFilters/StarRatingFilter';
import TypesFilter from '../components/searchFilters/TypesFilter';
import FacilitiesFilter from '../components/searchFilters/FacilitiesFilter';
import PriceFilter from '../components/searchFilters/PriceFilter';

const Search = () => {
	const search = useSearchContext();
	const [page, setPage] = useState<number>(1);

	const [selectedStars, setSelectedStars] = useState<string[]>([]);
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<number | undefined>(undefined);

	const [sortOptions, setSortOptions] = useState<string>('');

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

	const { data: propertyData } = useQuery(['searchProperty', searchParams], () => apiClient.searchProperty(searchParams));

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
		<div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 mt-5'>
			{/* Filters Aside */}
			<div className='rounded-lg border border-slate-200 p-5 h-fit sticky top-5'>
				<div className='space-y-4'>
					<h3 className='text-md font-semibold border-b border-slate-300 pb-3'>Filter</h3>
					<StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
					<TypesFilter selectedTypes={selectedTypes} onChange={handleTypesChange} />
					<FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange} />
					<PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
				</div>
			</div>

			{/* Results Group */}
			<div className='flex flex-col gap-5'>
				<div className='flex justify-between items-center'>
					<span className='text-md font-syne font-semibold'>
						{propertyData?.pagination.total} Properties found {search.destination ? `in ${search.destination}` : ''}
					</span>

					{/* Sort */}
					<select className='border border-slate-200 rounded-md px-5 py-2 text-sm font-light cursor-pointer' value={sortOptions} onChange={e => setSortOptions(e.target.value)}>
						<option value=''>Sort</option>
						<option value='starRating'>Star Rating</option>
						<option value='pricePerNightAsc'>Price: Low to High</option>
						<option value='pricePerNightDesc'>Price: High to Low</option>
					</select>
				</div>

				{/* Search Results */}
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
