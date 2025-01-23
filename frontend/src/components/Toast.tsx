import { useEffect } from 'react';

type ToastProps = {
	message: string;
	type: 'SUCCESS' | 'ERROR';
	onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [onClose]);

	const styles = type === 'SUCCESS' ? 'fixed top-4 right-4 z-50 px-5 py-4 rounded-full bg-green-100 text-green-500' : 'fixed top-4 right-4 z-50 p-4 rounded-full bg-red-100 text-red-500';

	return (
		<div className={styles}>
			<div className='flex justify-center items-center'>
				<span className='font-semibold text-sm'>{message}</span>
			</div>
		</div>
	);
};

export default Toast;
