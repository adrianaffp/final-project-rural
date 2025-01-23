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
			className='bg-white border border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light text-slate-700 rounded-full md:text-md px-6 py-2.5 disabled:opacity-50'
		>
			Sign Out
		</button>
	);
};

export default SignOutButton;
