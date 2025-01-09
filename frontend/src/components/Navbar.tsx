import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Navbar = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<div className='border-b-2 py-2'>
			<div className='container mx-auto flex justify-between items-center'>
				<Link to='/' className='font-syne font-semibold text-3xl text-gray-900'>
					rural
				</Link>
				<span>
					{isLoggedIn ? (
						<>
							<Link to='/my-bookings' className='text-gray-700 text-md  me-8 hover:text-gray-900'>
								My Bookings
							</Link>
							<Link to='/list-property' className='text-gray-700 text-md  me-10 hover:text-gray-900'>
								List your property
							</Link>
							<SignOutButton />
						</>
					) : (
						<>
							<Link to='/sign-in' className='text-gray-700 text-md px-7 me-2 hover:text-gray-900'>
								Sign in
							</Link>
							<Link
								to='/register'
								className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-full text-md px-7 py-2.5 me-2 mb-2'
							>
								Create Account
							</Link>
						</>
					)}
				</span>
			</div>
		</div>
	);
};

export default Navbar;
