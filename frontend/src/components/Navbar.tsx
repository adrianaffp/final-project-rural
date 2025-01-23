import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppContext } from '../contexts/AppContext';

import SignOutButton from './SignOutButton';

import { GoHeart } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';

const Navbar = () => {
	const { isLoggedIn } = useAppContext();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuMobileToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className='py-5 top-0 z-20 bg-white'>
			<div className='container mx-auto flex justify-between items-center z-100'>
				{/* logo */}
				<Link to='/' className='font-syne font-semibold text-3xl text-gray-900'>
					rural
				</Link>

				{/* center links */}
				<nav className='hidden md:flex flex-grow justify-center items-center space-x-10'>
					<Link to='/' className='text-slate-700 font-light text-md hover:text-slate-900'>
						Deals
					</Link>

					<Link to='/' className='text-slate-700 font-light text-md hover:text-slate-900'>
						Support
					</Link>

					<Link to='/search' className='text-slate-700 font-light text-md hover:text-slate-900'>
						Properties
					</Link>

					{isLoggedIn ? (
						<Link to='/my-bookings' className='text-slate-700 font-light text-md hover:text-slate-900'>
							Bookings
						</Link>
					) : (
						<Link to='/sign-in' className='text-slate-700 font-light text-md hover:text-slate-900'>
							Bookings
						</Link>
					)}
				</nav>

				{isLoggedIn ? (
					<ul className='hidden md:flex items-center gap-10'>
						{/* favs & user links */}
						<div className='flex items-center'>
							<li>
								<Link to='/my-favorites'>
									<div className='border border-transparent hover:border-slate-100 p-2.5 hover:shadow-md rounded-full cursor-pointer text-slate-800'>
										<GoHeart className='w-5 h-5' />
									</div>
								</Link>
							</li>

							<li className='relative group'>
								<div className='border border-transparent hover:border-slate-100 p-2.5 hover:shadow-md rounded-full cursor-pointer text-slate-800'>
									<AiOutlineUser className='w-5 h-5' />
								</div>

								{/* dropdown */}
								<ul className='absolute hidden group-hover:block left-0 space-y-3 py-3 px-3 w-48 bg-slate-50 border border-slate-100 rounded-xl shadow-lg font-light'>
									<li>
										<Link to='/my-bookings' className='text-slate-700 text-md  me-8 hover:text-slate-900'>
											My Bookings
										</Link>
									</li>
									<li>
										<Link to='/my-property' className='text-gray-700 text-md  me-8 hover:text-gray-900'>
											My Properties
										</Link>
									</li>
									<li>
										<Link to='/list-property' className='text-gray-700 text-md hover:text-gray-900'>
											List your property
										</Link>
									</li>
								</ul>
							</li>
						</div>

						<SignOutButton />
					</ul>
				) : (
					<div className='hidden md:block'>
						<Link to='/sign-in' className='text-slate-700 font-light text-md me-8 hover:text-slate-900'>
							Sign in
						</Link>
						<Link
							to='/register'
							className='bg-white border border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light rounded-full text-md px-6 py-2.5 disabled:opacity-50'
						>
							Create Account
						</Link>
					</div>
				)}

				{/* mobile menu */}
				<div className='flex items-center gap-3 md:hidden'>
					{/* favs link */}
					{isLoggedIn && (
						<Link to='/my-favorites'>
							<div className='border border-transparent hover:border-slate-100 p-2.5 hover:shadow-md rounded-full cursor-pointer text-slate-800'>
								<GoHeart className='w-6 h-6' />
							</div>
						</Link>
					)}

					{/* hamburger btn */}
					<button className='flex flex-col justify-center items-center w-10 h-10 bg-transparent border-none text-slate-800 cursor-pointer focus:outline-none space-y-1' onClick={menuMobileToggle}>
						<span className={`block w-6 h-0.5 bg-black rounded transition-transform duration-300 ${isMenuOpen ? 'translate-y-1 rotate-45' : ''} `}></span>
						<span className={`block w-6 h-0.5 bg-black rounded transition-transform duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
						<span className={`block w-6 h-0.5 bg-black rounded transition-transform duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''} `}></span>
					</button>
				</div>

				{/* links */}
				<div
					className={`absolute md:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-7 pb-7 transform transition-transform ${
						isMenuOpen ? 'opacity-100 ' : 'opacity-0 pointer-events-none'
					}`}
					style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
				>
					<li className='list-none'>
						<Link to='/' className='text-slate-700 font-light text-lg  hover:text-slate-900'>
							Deals
						</Link>
					</li>
					<li className='list-none'>
						<Link to='/' className='text-slate-700 font-light text-lg  hover:text-slate-900'>
							Support
						</Link>
					</li>
					<li className='list-none'>
						<Link to='/search' className='text-slate-700 font-light  text-lg  hover:text-slate-900'>
							Properties
						</Link>
					</li>

					{isLoggedIn ? (
						<ul className='border-t-2 mt-3 space-y-6 justify-center items-center text-center font-light'>
							<li className='pt-5 '>
								<Link to='/my-bookings' className='text-slate-700 text-lg hover:text-slate-900'>
									Bookings
								</Link>
							</li>
							<li>
								<Link to='/my-property' className='text-gray-700 text-lg hover:text-gray-900'>
									My Properties
								</Link>
							</li>
							<li>
								<Link to='/list-property' className='text-gray-700  text-lg  hover:text-gray-900'>
									List your property
								</Link>
							</li>

							<SignOutButton />
						</ul>
					) : (
						<ul className='border-t-2 mt-3 space-y-6 justify-center items-center text-center font-light text-slate-700 '>
							<li className='pt-5'>
								<Link to='/sign-in' className='text-slate-700 font-light text-lg hover:text-slate-900'>
									Sign in
								</Link>
							</li>
							<li>
								<Link
									to='/register'
									className='bg-white border border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light text-slate-700 rounded-full text-md px-6 py-2.5 disabled:opacity-50'
								>
									Create Account
								</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
