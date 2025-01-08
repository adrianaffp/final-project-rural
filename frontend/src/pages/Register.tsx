import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/aljezur.png';

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { showToast } = useAppContext();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
    } = useForm<RegisterFormData>();
    
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: 'Registration successful!', type: 'SUCCESS' });
            await queryClient.invalidateQueries('validateToken');
            navigate('/');
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        }
    });

	const onSubmit = handleSubmit(data => {
		mutation.mutate(data);
	});

	return (
		<div className='flex flex-col-reverse md:flex-row justify-between mt-4 md:mt-10'>
			<form onSubmit={onSubmit} className='flex flex-col gap-5 flex-1 md:mr-10'>
				<h2 className='text-3xl font-syne font-semibold'>Welcome to rural</h2>
				<p className='text-slate-700 text-md'>Create an account to get started</p>

				<div className='flex flex-col md:flex-row gap-5'>
					<label className='text-slate-700 text-sm font-semibold flex-1'>
						First Name
						<input className='border border-slate-400 w-full rounded-md px-3 py-2' {...register('firstName', { required: 'First Name is required' })} />
						{errors.firstName && <span className='text-red-500 text-xs'>{errors.firstName.message}</span>}
					</label>
					<label className='text-slate-700 text-sm font-semibold flex-1'>
						Last Name
						<input className='border border-slate-400 w-full rounded-md px-3 py-2' {...register('lastName', { required: 'Last Name is required' })} />
						{errors.lastName && <span className='text-red-500 text-xs'>{errors.lastName.message}</span>}
					</label>
				</div>
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
				<label className='text-slate-700 text-sm font-semibold flex-1'>
					Confirm Password
					<input
						type='password'
						className='border border-slate-400 w-full rounded-md px-3 py-2'
						{...register('confirmPassword', {
							validate: value => {
								if (!value) {
									return 'This field is required';
								} else if (watch('password') !== value) {
									return 'Passwords do not match';
								}
							},
						})}
					/>
					{errors.confirmPassword && <span className='text-red-500 text-xs'>{errors.confirmPassword.message}</span>}
				</label>

				<span className='text-sm'>
					Already have an account?{' '}
					<Link to='/sign-in' className='font-semibold'>
						Sign in
					</Link>
				</span>

				
					<button type='submit' className='bg-slate-700 hover:bg-slate-800 py-3 px-10 text-white font-semibold rounded-full'>
						Create Account
					</button>
				
			</form>
			<img src={img} className='hidden lg:block max-h-[500px] ' />
		</div>
	);
};

export default Register;
