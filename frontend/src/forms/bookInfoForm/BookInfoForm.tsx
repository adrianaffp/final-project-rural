import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useSearchContext } from '../../contexts/SearchContext';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

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
		<div className='flex flex-col px-8 py-6 bg-slate-100 rounded-lg gap-4'>
			<h3 className='text-lg text-slate-800 font-semibold'>{pricePerNight}€ per night</h3>

			<form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
				<div className='grid grid-cols-1 gap-4 items-center'>
					{/* check in & out datepicker */}
					<div>
						<DatePicker
							required
							placeholderText='Check-in'
							className='min-w-full font-syne w-full text-md font-light text-slate-700 focus:outline-none p-2'
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
					<div>
						<DatePicker
							required
							placeholderText='Check-out'
							className='min-w-full font-syne w-full text-md font-light text-slate-700 focus:outline-none p-2'
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
					<div className='flex flex-row justify-center gap-2 p-2 bg-white'>
						<label className='flex items-center font-light flex-1'>
							Adults:
							<input
								className='w-full p-1 focus:outline-none font-light text-md'
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

						<label className='flex items-center font-light flex-1 border-slate-200'>
							Children:
							<input
								className='w-full p-1 focus:outline-none font-light text-md'
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
						<button className='text-white font-syne bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-12 py-2.5 me-2 mb-2 disabled:opacity-50'>
							Book Now!
						</button>
					) : (
						<button className='text-white font-syne bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-12 py-2.5 me-2 mb-2 disabled:opacity-50'>
							Sign in to Book
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default BookInfoForm;
