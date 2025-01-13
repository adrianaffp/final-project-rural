import { Link } from 'react-router-dom';
import { IoBedOutline } from 'react-icons/io5';

const Hero = () => {
	return (
		<>
			<div
				className='h-[calc(100vh-11rem)] w-full bg-cover bg-top rounded-xl'
				style={{
					backgroundImage: `url('CascataTahitiGeres.jpg')`,
				}}
			>
				{/* hero content */}
				<div className='grid grid-cols-1 lg:grid-cols-2 place-items-center h-full'>
					<div className='space-y-5 ml-10 md:space-y-10'>
						<h1 className='font-syne text-3xl font-bold text-slate-100 md:text-5xl'>Looking for an authentic experience & for long lasting memories then join rural</h1>

						<Link
							to='/search'
							className='inline-flex items-center bg-slate-900 text-white font-light text-md hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full px-4 py-2.5 disabled:opacity-50'
						>
							<span className='bg-white text-slate-900 rounded-full p-2'>
								<IoBedOutline />
							</span>
							<span className='ml-2 mr-2 font-light'>Explore properties</span>
						</Link>

						<h4 className='lg:max-w-[400px] text-slate-100 text-sm'>With rural Portugal every journey is an opportunity for adventure, discovery and unforgettable moments!</h4>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;
