import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useSearchContext } from '../../contexts/SearchContext';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';

type Props = {
	propertyId: string;
	pricePerNight: number;
};

type BookInfoFormData = {
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
};

const BookInfoForm = ({ propertyId, pricePerNight }: Props) => {
	const search = useSearchContext();
	const { isLoggedIn } = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<BookInfoFormData>({
		defaultValues: {
			checkIn: search.checkIn,
			checkOut: search.checkOut,
			adultCount: search.adultCount,
			childCount: search.childCount,
		},
	});

	const checkIn = watch('checkIn');
	const checkOut = watch('checkOut');

	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	// sign in booking
	const onSignInClick = (data: BookInfoFormData) => {
		search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount);
		navigate('/sign-in', { state: { from: location } });
	};

	// isLoggedIn booking
	const onSubmit = (data: BookInfoFormData) => {
		search.saveSearchValues('', data.checkIn, data.checkOut, data.adultCount, data.childCount);
		navigate(`/property/${propertyId}/booking`, { state: { from: location } });
	};

	return (
		<div className='flex flex-col px-8 py-6 shadow-lg border border-slate-100 rounded-lg gap-4'>
			<h3 className='font-syne text-2xl text-slate-800 font-light text-center'>{pricePerNight}€ per night</h3>

			<form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
				<div className='grid grid-cols-1 gap-4 items-center'>
					{/* check in & out datepicker */}
					<div className='flex flex-row items-center gap-4 px-5 py-2 rounded-full bg-slate-100'>
						<span>
							<IoCalendarOutline className='w-5 h-5 text-slate-700' />
						</span>

						<DatePicker
							required
							placeholderText='Check-in'
							className='bg-slate-100 font-syne text-md font-light text-slate-700 focus:outline-none cursor-pointer'
							wrapperClassName='min-w-full'
							dateFormat={'dd/MM/yyyy'}
							selected={checkIn}
							onChange={date => setValue('checkIn', date as Date)}
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
							required
							placeholderText='Check-out'
							className='bg-slate-100 rounded-full font-syne text-md font-light text-slate-700 focus:outline-none cursor-pointer'
							wrapperClassName='min-w-full'
							dateFormat={'dd/MM/yyyy'}
							selected={checkOut}
							onChange={date => setValue('checkOut', date as Date)}
							selectsStart
							startDate={checkIn}
							endDate={checkOut}
							minDate={minDate}
							maxDate={maxDate}
						/>
					</div>

					{/* guest count */}
					<div className='flex flex-row justify-center gap-2 px-5 py-2 rounded-full bg-slate-100'>
						<label className='flex items-center font-light flex-1'>
							Adults:
							<input
								className='w-full bg-slate-100 pl-2 font-light text-md focus:outline-none'
								type='number'
								min={1}
								max={10}
								{...register('adultCount', {
									required: 'This field is required',
									min: {
										value: 1,
										message: 'One Adult Minimum is required',
									},
									valueAsNumber: true,
								})}
							/>
						</label>

						<label className='flex items-center font-light flex-1 '>
							Children:
							<input
								className='w-full bg-slate-100 pl-2 font-light text-md focus:outline-none'
								type='number'
								min={0}
								max={10}
								{...register('childCount', {
									valueAsNumber: true,
								})}
							/>
						</label>
						{errors.adultCount && <span className='text-sm text-red-500'>{errors.adultCount.message}</span>}
					</div>

					{/* submit button */}
					{isLoggedIn ? (
						<button className='bg-slate-900 text-white font-light text-md hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full px-12 py-2.5 disabled:opacity-50'>
							Book Now !
						</button>
					) : (
						<button className='bg-slate-900 text-white font-light text-md hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full px-12 py-2.5 disabled:opacity-50'>
							Sign in to Book
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default BookInfoForm;
