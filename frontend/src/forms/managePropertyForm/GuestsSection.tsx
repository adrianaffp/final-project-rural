import { useFormContext } from 'react-hook-form';
import { PropertyFormData } from './ManagePropertyForm';

const GuestsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<PropertyFormData>();

	return (
		<div>
			<h2 className='text-xl text-slate-700 font-syne font-semibold mb-4'>Guests:</h2>

			<div className='grid grid-cols-2 gap-7 px-5'>
				<label className='text-slate-700 text-sm font-semibold'>
					Adults
					<input type='number' min={1} className='border border-slate-400 w-full rounded-md px-3 py-2 font-light' {...register('adultCount', { required: 'This field is required' })} />
					{errors.adultCount && <span className='text-red-500 text-xs'>{errors.adultCount.message}</span>}
				</label>

				<label className='text-slate-700 text-sm font-semibold'>
					Children
					<input type='number' min={0} className='border border-slate-400 w-full rounded-md px-3 py-2 font-light' {...register('childCount', { required: 'This field is required' })} />
					{errors.childCount && <span className='text-red-500 text-xs'>{errors.childCount.message}</span>}
				</label>
			</div>
		</div>
	);
};

export default GuestsSection;
