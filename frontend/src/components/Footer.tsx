import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='bg-slate-900 py-10'>
			<div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
				<Link to='/' className='font-syne font-semibold text-3xl text-slate-100 mb-3'>
					rural
				</Link>
				<span className='text-white font-light tracking-tighter flex gap-4'>
					<span>Privacy Policy</span>
					<span>Terms & Conditions</span>
				</span>
			</div>
		</div>
	);
};

export default Footer;
