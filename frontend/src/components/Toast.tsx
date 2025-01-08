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
		}, 4000);

		return () => {
			clearTimeout(timer);
		};
	}, [onClose]);

	const styles = type === 'SUCCESS' ? 'fixed top-4 right-4 z-50 p-4 rounded-full bg-slate-600 text-green-200' : 'fixed top-4 right-4 z-50 p-4 rounded-full bg-slate-600 text-red-200';

	return (
		<div className={styles}>
			<div className='flex justify-center items-center'>
				<span className='font-semibold text-sm'>{message}</span>
			</div>
		</div>
	);
};

export default Toast;
