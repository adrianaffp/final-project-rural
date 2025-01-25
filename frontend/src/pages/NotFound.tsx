import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center mt-20 mb-20 text-center'>
			<h2 className='text-2xl md:text-3xl font-syne'>Oops! Something went wrong.</h2>
			<h1 className='text-7xl md:text-9xl font-syne'>404</h1>
			<p className='text-lg font-light mt-10 md:mt-16 mb-5'>Sorry, we can't seem to find the page you're looking for.</p>

			<Link to='/' className='bg-white border border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-light text-slate-700 rounded-full text-md px-6 py-2.5'>
				Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
