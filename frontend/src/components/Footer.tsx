import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='bg-slate-900 pt-10 pb-3 rounded-t-3xl'>
			<div className='container mx-auto px-2 lg:px-0'>
				<div className='flex flex-col md:flex-row md:justify-between mb-10 md:mb-16'>
					<div>
						<Link to='/' className='font-syne font-semibold text-3xl text-slate-100'>
							rural
						</Link>
						<p className='text-slate-300 font-light text-sm mt-2'>Unique rural accommodations across Portugal.</p>
					</div>

					<div className='flex flex-col md:flex-row md:gap-40'>
						{/* footer nav */}
						<div className='flex flex-col gap-2 justify-center items-center md:items-start mt-6'>
							<Link to='/' className='text-slate-300 font-light hover:text-slate-100'>
								Deals
							</Link>

							<Link to='/' className='text-slate-300 font-light hover:text-slate-100'>
								Support
							</Link>

							<Link to='/search' className='text-slate-300 font-light hover:text-slate-100'>
								All Properties
							</Link>
						</div>

						{/* social links */}
						<div className='flex flex-col items-center md:items-start gap-2 mt-6'>
							<Link to='*' className='text-slate-300 font-light hover:text-slate-100'>
								X (Twitter)
							</Link>

							<Link to='*' className='text-slate-300 font-light hover:text-slate-100'>
								LinkedIn
							</Link>
						</div>
					</div>
				</div>

				<div className='flex flex-col-reverse md:flex-row justify-end items-center gap-3 md:gap-9'>
					<span className='text-slate-600 font-light text-sm pr-2'>&copy; 2025 rural. All rights reserved</span>

					<Link to='*' className='text-slate-600 font-light text-sm'>
						Privacy Policy
					</Link>
					<Link to='*' className='text-slate-600 font-light text-sm'>
						Terms of Use
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
