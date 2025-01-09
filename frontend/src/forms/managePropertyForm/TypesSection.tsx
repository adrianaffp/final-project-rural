import { useFormContext } from 'react-hook-form';
import { propertyTypes } from '../../config/propertyOptionsConfig';
import { PropertyFormData } from './ManagePropertyForm';

const TypesSection = () => {
    const { register, watch, formState: { errors } } = useFormContext<PropertyFormData>();
    const typeWatch = watch('type');

	return (
		<div>
			<h2 className='text-xl text-slate-700 font-syne font-semibold mb-4'>Property Type:</h2>

			<div className='grid grid-cols-2 gap-5 md:grid-cols-4'>
				{propertyTypes.map(type => (
					<label
						className={
							typeWatch === type
								? 'cursor-pointer text-sm font-light text-slate-700 bg-slate-200 border border-slate-400 rounded-full px-3 py-2 text-center'
								: 'cursor-pointer  text-sm font-light text-slate-700 border border-slate-400 rounded-full px-3 py-2 text-center'
						}
					>
						<input type='radio' value={type} {...register('type', { required: 'Select a property type' })} className='hidden'/>
						<span>{type}</span>
					</label>
				))}
            </div>
            {errors.type && <span className='text-red-500 text-xs'>{errors.type.message}</span>}
		</div>
	);
};

export default TypesSection;
