import { useFormContext } from 'react-hook-form';
import { PropertyFormData } from './ManagePropertyForm';

const ImagesSection = () => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext<PropertyFormData>();

	const existingImages = watch("imageUrls");

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrls: string) => {
		e.preventDefault();

		setValue("imageUrls", existingImages.filter(url => url !== imageUrls));
	}

	return (
		<div>
			<h2 className='text-xl text-slate-700 font-syne font-semibold mb-4'>Upload Images:</h2>

			<div>
				{existingImages && (
					<div className='grid grid-cols-6 gap-5 mb-3'>
						{existingImages.map(imgUrl => (
							<div className='relative group'>
								<img src={imgUrl} className='min-h-full object-cover rounded-md' />
								<button onClick={e => handleDelete(e, imgUrl)} className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 text-white'>Delete</button>
							</div>
						))}
					</div>
				)}

				<input
					type='file'
					multiple
					accept='image/*'
					className='border border-slate-400 text-sm rounded-md px-5 py-2 font-light'
					{...register('imageFiles', {
						validate: img => {
							const totalLength = img.length + (existingImages?.length || 0);

							if (totalLength === 0) {
								return 'Upload at least one image';
							}

							if (totalLength > 6) {
								return "Can't upload more than 6 images!";
							}
						},
					})}
				/>
			</div>
			{errors.imageFiles && <span className='text-red-500 text-xs'>{errors.imageFiles.message}</span>}
		</div>
	);
};

export default ImagesSection;
