import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';

import * as apiClient from '../api-client';

import { useAppContext } from '../contexts/AppContext';

import img from '../assets/alentejo.jpg';

export type SignInFormData = {
	email: string;
	password: string;
};

const SignIn = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<SignInFormData>();

	const mutation = useMutation(apiClient.signIn, {
		onSuccess: async () => {
			showToast({ message: 'Sign in successful', type: 'SUCCESS' });
			await queryClient.invalidateQueries('validateToken');
			navigate(location.state?.from?.pathname || '/');
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' });
		},
	});

	const onSubmit = handleSubmit(data => {
		mutation.mutate(data);
	});

	return (
		<div className='flex flex-col md:flex-row justify-between mt-4 md:mt-10 md:pb-32'>
			<form className='flex flex-col gap-5 flex-1 md:mr-10' onSubmit={onSubmit}>
				<h2 className='text-3xl font-syne font-semibold '>Sign In</h2>

				<label className='text-slate-700 text-sm font-semibold'>
					Email
					<input type='email' className='border border-slate-400 w-full rounded-md px-3 py-2' {...register('email', { required: 'Email is required' })} />
					{errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
				</label>

				<label className='text-slate-700 text-sm font-semibold'>
					Password
					<input
						type='password'
						className='border border-slate-400 w-full rounded-md px-3 py-2'
						{...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
					/>
					{errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
				</label>

				<span className='text-sm pt-4'>
					Don't have an account yet?{' '}
					<Link to='/register' className='font-semibold'>
						Create one here!
					</Link>
				</span>

				<button type='submit' className='bg-slate-900 text-white font-light text-md hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full px-2 py-2.5'>
					Sign In
				</button>
			</form>

			<div className='max-w-[600px]'>
				<img src={img} className='w-full object-cover object-center hidden lg:block ' />
			</div>
		</div>
	);
};

export default SignIn;
