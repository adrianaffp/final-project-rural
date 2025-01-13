type Props = {
	selectedPrice?: number;
	onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
	return (
		<div>
			<h4 className='font-semibold text-sm mb-2'>Max Price</h4>
			
			<select className='border border-gray-300 rounded px-2 py-1 text-sm font-light w-full' value={selectedPrice} onChange={e => onChange(e.target.value ? parseInt(e.target.value) : undefined)}>
				<option value=''>Select Max Price</option>
				{[50, 100, 250, 400, 550].map(price => (
					<option value={price} key={price}>
						{price}
					</option>
				))}
			</select>
		</div>
	);
};

export default PriceFilter;
