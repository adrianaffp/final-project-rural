import { useForm } from 'react-hook-form';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import img from '../assets/alentejo.jpg';

export type SignInFormData = {
	email: string;
	password: string;
};

const SignIn = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();
	const navigate = useNavigate();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<SignInFormData>();

	const mutation = useMutation(apiClient.signIn, {
		onSuccess: async () => {
			showToast({ message: 'Sign in successful', type: 'SUCCESS' });
			await queryClient.invalidateQueries('validateToken');
			navigate('/');
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' });
		},
	});

	const onSubmit = handleSubmit(data => {
		mutation.mutate(data);
	});

	return (
		<div className='flex flex-col-reverse md:flex-row justify-between mt-4 md:mt-10'>
			<form className='flex flex-col gap-5 flex-1 md:mr-10 ' onSubmit={onSubmit}>
				<h2 className='text-3xl font-syne font-semibold '>Sign In</h2>

				<label className='text-slate-700 text-sm font-semibold flex-1'>
					Email
					<input type='email' className='border border-slate-400 w-full rounded-md px-3 py-2' {...register('email', { required: 'Email is required' })} />
					{errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
				</label>

				<label className='text-slate-700 text-sm font-semibold flex-1'>
					Password
					<input
						type='password'
						className='border border-slate-400 w-full rounded-md px-3 py-2'
						{...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
					/>
					{errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
				</label>

				<span className='text-sm'>
					Don't have an account yet?{' '}
					<Link to='/register' className='font-semibold'>
						Create one here!
					</Link>
				</span>

				<button type='submit' className='bg-slate-700 hover:bg-slate-800 py-3 px-10 text-white font-semibold rounded-full'>
					Sign In
				</button>
			</form>
			<img src={img} className='max-h-[300px] hidden lg:block ' />
		</div>
	);
};

export default SignIn;
