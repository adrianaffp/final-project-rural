import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import ManagePropertyForm from '../forms/managePropertyForm/ManagePropertyForm';
import { useAppContext } from '../contexts/AppContext';

const EditProperty = () => {
    const { propertyId } = useParams();
    const { showToast } = useAppContext();

	const { data: property } = useQuery('getMyPropertyById', () => apiClient.getMyPropertyById(propertyId || ''), {
		enabled: !!propertyId,
    });
    
    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({ message: 'Property updated successfully!', type: 'SUCCESS' });
        },
        onError: () => {
            showToast({ message: 'Error updating property', type: 'ERROR' });
        }
    });

    const handleSave = (PropertyFormData: FormData) => { 
        mutate(PropertyFormData);
    }
    
    return <ManagePropertyForm property={property} onSave={handleSave} isLoading={isLoading} />;
};

export default EditProperty;
