import { FormEvent, useState } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { IoSearchOutline } from 'react-icons/io5';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';

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
		<form onSubmit={handleSubmit} className='container mx-auto bg-white shadow-md border border-slate-100 rounded-md lg:rounded-full grid grid-cols-2 lg:grid-cols-5 gap-4 px-3 py-2 mt-5'>
			{/* destination */}
			<div className='flex flex-row items-center flex-1 gap-2 px-4 py-2 rounded-full bg-slate-100'>
				<IoSearchOutline className='w-5 h-5 text-slate-700' />
				<input
					placeholder='Where to?'
					className='w-full bg-slate-100 font-syne text-md font-light text-slate-700 focus:outline-none'
					value={destination}
					onChange={e => setDestination(e.target.value)}
				/>
			</div>

			{/* guests */}
			<div className='flex flex-row items-center lg:justify-center px-5 py-2 gap-1 rounded-full bg-slate-100'>
				<label className='flex items-center text-slate-700 text-sm ml-2'>
					Adults:
					<input
						className='w-9 bg-slate-100 pl-1 focus:outline-none font-light text-slate-700'
						type='number'
						min={1}
						max={10}
						value={adultCount}
						onChange={e => setAdultCount(parseInt(e.target.value))}
					/>
				</label>

				<label className='flex items-center text-slate-700 text-sm'>
					Children:
					<input
						className='w-9 bg-slate-100 pl-1 focus:outline-none font-light text-slate-700'
						type='number'
						min={0}
						max={10}
						value={childCount}
						onChange={e => setChildCount(parseInt(e.target.value))}
					/>
				</label>
			</div>

			{/* check in & out datepicker */}
			<div className='flex flex-row items-center gap-4 px-5 py-2 rounded-full bg-slate-100'>
				<span>
					<IoCalendarOutline className='w-5 h-5 text-slate-700' />
				</span>

				<DatePicker
					placeholderText='Check-in'
					className='bg-slate-100 font-syne text-md font-light text-slate-700 focus:outline-none'
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

			<div className='flex flex-row items-center gap-4 px-5 py-2 rounded-full bg-slate-100'>
				<span>
					<IoCalendarOutline className='w-5 h-5 text-slate-700' />
				</span>

				<DatePicker
					placeholderText='Check-out'
					className='bg-slate-100 font-syne text-md font-light text-slate-700 focus:outline-none'
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

			{/* search btn */}
			<div className='flex'>
				<button className='flex-1 bg-slate-900 text-white font-light text-md hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full px-12 py-2.5 disabled:opacity-50'>
					Search Property
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
