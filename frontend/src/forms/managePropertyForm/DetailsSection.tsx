import { useFormContext } from 'react-hook-form';
import { PropertyFormData } from './ManagePropertyForm';

const DetailsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<PropertyFormData>();

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-3xl font-syne font-semibold mb-4'>List your property</h1>

			
			<label className='text-slate-700 text-sm font-semibold flex-1'>
				Name
				<input type='text' className='border border-slate-400 w-full rounded-md px-3 py-2 font-light' {...register('name', { required: 'Name is required' })} />
				{errors.name && <span className='text-red-500 text-xs'>{errors.name.message}</span>}
			</label>

			<label className='text-slate-700 text-sm font-semibold flex-1'>
				City
				<input type='text' className='border border-slate-400 w-full rounded-md px-3 py-2 font-light' {...register('city', { required: 'City is required' })} />
				{errors.city && <span className='text-red-500 text-xs'>{errors.city.message}</span>}
			</label>

			<label className='text-slate-700 text-sm font-semibold flex-1'>
				Description
				<textarea rows={7} className='border border-slate-400 w-full rounded-md px-3 py-2 font-light' {...register('description', { required: 'Description is required' })} />
				{errors.description && <span className='text-red-500 text-xs'>{errors.description.message}</span>}
			</label>

			<label className='text-slate-700 text-sm font-semibold max-w-[50%]'>
				Price per Night
				<input type='number' min={1} className='border border-slate-400 w-full rounded-md px-3 py-2 font-light' {...register('pricePerNight', { required: 'Price is required' })} />
				{errors.pricePerNight && <span className='text-red-500 text-xs'>{errors.pricePerNight.message}</span>}
			</label>

			<label className='text-slate-700 text-sm font-semibold max-w-[50%]'>
				Rating
				<select className='border border-slate-400 w-full rounded-md px-3 py-2 font-light cursor-pointer' {...register('starRating', { required: 'Rating is required' })}>
					<option value='' className='text-sm'>
						Select Star Rating
					</option>
					{[1, 2, 3, 4, 5].map(number => (
						<option value={number}>{number}</option>
					))}
				</select>
				{errors.starRating && <span className='text-red-500 text-xs'>{errors.starRating.message}</span>}
			</label>
		</div>
	);
};

export default DetailsSection;
