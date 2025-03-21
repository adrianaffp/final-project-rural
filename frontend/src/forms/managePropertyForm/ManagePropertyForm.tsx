import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { PropertyType } from '../../../../backend/src/shared/types';

import LoadingSpinner from '../../components/LoadingSpinner';

import DetailsSection from './DetailsSection';
import TypesSection from './TypesSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';

export type PropertyFormData = {
	name: string;
	region: string;
	county: string;
	description: string;
	type: string;
	facilities: string[];
	adultCount: number;
	childCount: number;
	starRating: number;
	pricePerNight: number;
	imageFiles: FileList;
	imageUrls: string[];
};

type Props = {
	property?: PropertyType;
	onSave: (PropertyFormData: FormData) => void;
	isLoading: boolean;
};

const ManagePropertyForm = ({ onSave, isLoading, property }: Props) => {
	const formMethods = useForm<PropertyFormData>();

	const { handleSubmit, reset } = formMethods;

	useEffect(() => {
		reset(property);
	}, [property, reset]);

	const onSubmit = handleSubmit((formDataJson: PropertyFormData) => {
		console.log('Submitted form data:', formDataJson);

		const formData = new FormData();

		// for edit property
		if (property) {
			formData.append('propertyId', property._id);
		}
		//

		formData.append('name', formDataJson.name);
		formData.append('region', formDataJson.region);
		formData.append('county', formDataJson.county);
		formData.append('description', formDataJson.description);
		formData.append('type', formDataJson.type);
		formData.append('adultCount', formDataJson.adultCount.toString());
		formData.append('childCount', formDataJson.childCount.toString());
		formData.append('starRating', formDataJson.starRating.toString());
		formData.append('pricePerNight', formDataJson.pricePerNight.toString());

		formDataJson.facilities.forEach((facility, index) => {
			formData.append(`facilities[${index}]`, facility);
		});

		// for edit property
		if (formDataJson.imageUrls) {
			formDataJson.imageUrls.forEach((imageUrl, index) => {
				formData.append(`imageUrls[${index}]`, imageUrl);
			});
		}
		//

		Array.from(formDataJson.imageFiles).forEach(file => {
			formData.append(`imageFiles`, file);
		});

		onSave(formData);
	});

	return (
		<FormProvider {...formMethods}>
			<form className='flex flex-col gap-10 bg-gray-50 max-w-[1000px] mx-auto px-5 lg:px-12 py-10 rounded-3xl' onSubmit={onSubmit}>
				<DetailsSection />
				<TypesSection />
				<FacilitiesSection />
				<GuestsSection />
				<ImagesSection />

				<span className='flex justify-end'>
					<button
						disabled={isLoading}
						type='submit'
						className='text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-12 py-2.5 me-2 mb-2 disabled:opacity-50'
					>
						{isLoading ? <LoadingSpinner /> : 'Save'}
					</button>
				</span>
			</form>
		</FormProvider>
	);
};

export default ManagePropertyForm;
