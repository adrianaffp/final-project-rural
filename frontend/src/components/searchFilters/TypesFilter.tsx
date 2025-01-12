import { propertyTypes } from '../../config/propertyOptionsConfig';

type Props = {
	selectedTypes: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TypesFilter = ({ selectedTypes, onChange }: Props) => {
	return (
		<div className='border-b border-gray-200 pb-5'>
			<h4>Property Type:</h4>
			{propertyTypes.map(type => (
				<label className='flex items-center space-x-2'>
					<input type='checkbox' className='rounded' value={type} checked={selectedTypes.includes(type)} onChange={onChange} />
					<span>{type}</span>
				</label>
			))}
		</div>
	);
};

export default TypesFilter;
