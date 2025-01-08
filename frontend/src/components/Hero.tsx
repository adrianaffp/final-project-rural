import heroImg from '../assets/cascata_de_leonte_geres.webp';

const Hero = () => {
	return (
		<div className='container mx-auto flex flex-col-reverse md:flex-row justify-between mt-4 md:mt-10'>
			<img src={heroImg} className='max-h-[500px] hidden lg:block ' />
			<div className='text-left md:ml-10'>
				<h1 className='font-syne text-3xl font-bold text-slate-900 pb-5 md:text-5xl'>Looking for an authentic experience & long lasting memories rural Portugal is here</h1>
			</div>
		</div>
	);
};

export default Hero;
