import { useMutation } from 'react-query';
import ManagePropertyForm from '../forms/managePropertyForm/ManagePropertyForm';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';

const ListProperty = () => {
	const { showToast } = useAppContext();
	
	const { mutate, isLoading } = useMutation(apiClient.listMyProperty, {
		onSuccess: () => {
			showToast({ message: 'Property listed successfully!', type: 'SUCCESS' });
		},
		onError: () => {
			showToast({ message: 'Error listing property', type: 'ERROR' });
		}
	});

	const handleSave = (PropertyFormData: FormData) => {
		mutate(PropertyFormData);
	}
	
	return (
		<div>
			<ManagePropertyForm onSave={handleSave} isLoading={isLoading} />
		</div>
	);
};

export default ListProperty;
