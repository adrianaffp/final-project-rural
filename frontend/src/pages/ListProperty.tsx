import { useMutation } from 'react-query';

import * as apiClient from '../api-client';

import { useAppContext } from '../contexts/AppContext';

import ManagePropertyForm from '../forms/managePropertyForm/ManagePropertyForm';

const ListProperty = () => {
	const { showToast } = useAppContext();

	const { mutate, isLoading } = useMutation(apiClient.listMyProperty, {
		onSuccess: () => {
			showToast({ message: 'Property listed successfully!', type: 'SUCCESS' });
		},
		onError: () => {
			showToast({ message: 'Error listing property', type: 'ERROR' });
		},
	});

	const handleSave = (PropertyFormData: FormData) => {
		mutate(PropertyFormData);
	};

	return (
		<div>
			{/* header */}
			<div className='flex flex-col md:flex-row justify-between md:items-center mb-10'>
				<h2 className='font-syne text-3xl lg:text-5xl font-semibold'>List your property</h2>
				<h4 className='font-syne text-sm max-w-[400px] text-slate-600 lg:text-base lg:leading-tight'>Get your property listed and start receiving bookings from all over the world!</h4>
			</div>

			{/* form */}
			<ManagePropertyForm onSave={handleSave} isLoading={isLoading} />
		</div>
	);
};

export default ListProperty;
