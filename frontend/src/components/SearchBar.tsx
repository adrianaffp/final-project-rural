import { FormEvent, useState } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { IoSearchOutline } from 'react-icons/io5';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
	const navigate = useNavigate();
	const search = useSearchContext();

	const [destination, setDestination] = useState<string>(search.destination);
	const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
	const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
	const [adultCount, setAdultCount] = useState<number>(search.adultCount);
	const [childCount, setChildCount] = useState<number>(search.childCount);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);

		navigate('/search');
	};

	/* Check in and check out dates */
	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	return (
		<form onSubmit={handleSubmit} className='container mx-auto bg-slate-200 rounded-full grid grid-cols-2 lg:grid-cols-5 items-center gap-4 px-3 py-2'>
			<div className='flex flex-row items-center flex-1 gap-2 px-4 py-2 rounded-full bg-white'>
				<IoSearchOutline />
				<input placeholder='Where to?' className='font-syne w-full text-md font-light text-slate-700 focus:outline-none' value={destination} onChange={e => setDestination(e.target.value)} />
			</div>
			<div className='flex flex-row justify-center items-center flex-1 gap-2 px-4 py-2 rounded-full bg-white'>
				<label className='flex items-center'>
					Adults:
					<input
						className='w-full p-1 focus:outline-none font-syne font-light text-md text-slate-700'
						type='number'
						min={1}
						max={10}
						value={adultCount}
						onChange={e => setAdultCount(parseInt(e.target.value))}
					/>
				</label>
				<label className='flex items-center'>
					Children:
					<input
						className='w-full p-1 focus:outline-none font-syne font-light text-md text-slate-700 border-left-2 border-slate-400'
						type='number'
						min={0}
						max={10}
						value={childCount}
						onChange={e => setChildCount(parseInt(e.target.value))}
					/>
				</label>
			</div>
			<div>
				<DatePicker
					placeholderText='Check-in'
					className='min-w-full font-syne w-full text-md font-light text-slate-700 focus:outline-none'
					wrapperClassName='min-w-full'
					dateFormat={'dd/MM/yyyy'}
					selected={checkIn}
					onChange={date => setCheckIn(date as Date)}
					selectsStart
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
				/>
			</div>
			<div>
				<DatePicker
					placeholderText='Check-out'
					className='min-w-full font-syne w-full text-md font-light text-slate-700 focus:outline-none'
					wrapperClassName='min-w-full'
					dateFormat={'dd/MM/yyyy'}
					selected={checkOut}
					onChange={date => setCheckOut(date as Date)}
					selectsStart
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
				/>
			</div>
			<div className='flex gap-1 '>
				<button className='flex-1 rounded-full bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 focus:outline-none focus:shadow-outline'>Search</button>
				<button className='rounded-full bg-slate-900 text-gray-200 font-semibold py-2 px-4 focus:outline-none focus:shadow-outline'>
					<FaRegTrashCan />
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
