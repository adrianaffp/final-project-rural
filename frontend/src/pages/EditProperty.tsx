import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import * as apiClient from '../api-client';

import { useAppContext } from '../contexts/AppContext';

import ManagePropertyForm from '../forms/managePropertyForm/ManagePropertyForm';

const EditProperty = () => {
	const { propertyId } = useParams();
	const { showToast } = useAppContext();

	const { data: property } = useQuery('getMyPropertyById', () => apiClient.getMyPropertyById(propertyId || ''), {
		enabled: !!propertyId,
	});

	const { mutate, isLoading } = useMutation(apiClient.updateMyPropertyById, {
		onSuccess: () => {
			showToast({ message: 'Property updated successfully!', type: 'SUCCESS' });
		},
		onError: () => {
			showToast({ message: 'Error updating property', type: 'ERROR' });
		},
	});

	const handleSave = (PropertyFormData: FormData) => {
		mutate(PropertyFormData);
	};

	return (
		<div>
			{/* header */}
			<div className='flex flex-col md:flex-row justify-between md:items-center mb-10'>
				<h2 className='font-syne text-3xl lg:text-5xl font-semibold'>Edit Property</h2>
				<h4 className='font-syne text-sm max-w-[400px] text-slate-600 lg:text-base lg:leading-tight'>Get your property listed and start receiving bookings from all over the world!</h4>
			</div>
			{/* form */}
			<ManagePropertyForm property={property} onSave={handleSave} isLoading={isLoading} />
		</div>
	);
};

export default EditProperty;
