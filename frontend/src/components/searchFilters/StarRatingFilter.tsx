type Props = {
	selectedStars: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
	return (
		<div className='border-b border-gray-200 pb-4'>
			<h4 className='font-semibold text-sm mb-2'>Rating</h4>

			{['5', '4', '3', '2', '1'].map(star => (
				<label className='flex items-center space-x-2 text-sm font-light mb-1'>
					<input type='checkbox' className='rounded cursor-pointer' value={star} checked={selectedStars.includes(star)} onChange={onChange} />
					<span>{star} Stars</span>
				</label>
			))}
		</div>
	);
};

export default StarRatingFilter;
