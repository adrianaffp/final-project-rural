type LoadingSpinnerProps = {
	size?: number;
};

const LoadingSpinner = ({ size = 20 }: LoadingSpinnerProps) => {
	return (
		<div className='flex justify-center items-center'>
			<div className='border-2 border-t-black border-gray-300 rounded-full animate-spin' style={{ width: size, height: size }}></div>
		</div>
	);
};

export default LoadingSpinner;
