import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const SignOutButton = () => {
    const queryClient = useQueryClient();
	const { showToast } = useAppContext();

	const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken');
			showToast({ message: 'Sign out successful', type: 'SUCCESS' });
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' });
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};

	return (
		<button
			onClick={handleClick}
			className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-full text-md px-7 py-2.5 me-2 mb-2'
		>
			Sign Out
		</button>
	);
};

export default SignOutButton;
