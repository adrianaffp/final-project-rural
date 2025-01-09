import { useFormContext } from 'react-hook-form';
import { propertyFacilities } from '../../config/propertyOptionsConfig';
import { PropertyFormData } from './ManagePropertyForm';

const FacilitiesSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<PropertyFormData>();

	return (
		<div>
			<h2 className='text-xl text-slate-700 font-syne font-semibold mb-4'>Popular Facilities:</h2>

			<div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 px-5'>
				{propertyFacilities.map(facility => (
					<label className='cursor-pointer flex gap-2 text-sm font-light text-slate-700'>
						<input
							type='checkbox'
							value={facility}
							{...register('facilities', {
								validate: facilities => {
									if (facilities && facilities.length > 0) {
										return true;
									} else {
										return 'Select at least one facility';
									}
								},
							})}
						/>
						<span>{facility}</span>
					</label>
				))}
			</div>
			{errors.facilities && <span className='text-red-500 text-xs'>{errors.facilities.message}</span>}
		</div>
	);
};

export default FacilitiesSection;
