import { useMutation, useQuery, useQueryClient } from 'react-query';

import * as apiClient from '../api-client';

import { useAppContext } from '../contexts/AppContext';

import LoadingSpinner from './LoadingSpinner';

import { GoHeart, GoHeartFill } from 'react-icons/go';

type FavoritesToggleProps = {
	propertyId: string;
};

const FavoritesToggle = ({ propertyId }: FavoritesToggleProps) => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();

	const { data: favorites = [], isLoading: isLoadingFavorites } = useQuery('getMyFavorites', apiClient.getFavorites);

	const isFavorite = favorites.some(favorite => favorite._id === propertyId);

	const { mutate: toggleFavorite, isLoading } = useMutation(
		async () => {
			return isFavorite ? apiClient.removeFavorite(propertyId) : apiClient.addFavorite(propertyId);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('getMyFavorites');
				showToast({ message: isFavorite ? 'Removed from favorites' : 'Added to favorites', type: 'SUCCESS' });
			},
			onError: () => {
				showToast({ message: 'Error adding to favorites', type: 'ERROR' });
			},
		},
	);

	const handleFavoritesToggle = () => {
		if (!isLoading) {
			toggleFavorite();
		}
	};

	if (isLoadingFavorites) {
		return <LoadingSpinner />;
	}

	return (
		<button
			onClick={handleFavoritesToggle}
			disabled={isLoading}
			className='border border-slate-100 p-2.5 shadow-md rounded-full'
			aria-label='Favorites Toggle'
		>
			{isLoading ? <LoadingSpinner /> : isFavorite ? <GoHeartFill className='w-5 h-5 text-red-500' /> : <GoHeart className='w-5 h-5 text-slate-600' />}
		</button>
	);
};

export default FavoritesToggle;
