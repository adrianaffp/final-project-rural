import { useFormContext } from 'react-hook-form';
import { PropertyFormData } from './ManagePropertyForm';

const ImagesSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<PropertyFormData>();

	return (
		<div >
			<h2 className='text-xl text-slate-700 font-syne font-semibold mb-4'>Upload Images:</h2>

			<input
				type='file'
				multiple
				accept='image/*'
				className='border border-slate-400 text-sm rounded-md px-5 py-2 font-light'
				{...register('imageFiles', {
					validate: img => {
						const totalLength = img.length;

						if (totalLength === 0) {
							return 'Upload at least one image';
						}

						if (totalLength > 6) {
							return "Can't upload more than 6 images!";
						}
					},
				})}
			/>
			{errors.imageFiles && <span className='text-red-500 text-xs'>{errors.imageFiles.message}</span>}
		</div>
	);
};

export default ImagesSection;
