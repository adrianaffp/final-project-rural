import { propertyFacilities } from '../../config/propertyOptionsConfig';

type Props = {
	selectedFacilities: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
	return (
		<div className='border-b border-gray-200 pb-5'>
			<h4>Facilities:</h4>
			{propertyFacilities.map(facility => (
				<label className='flex items-center space-x-2'>
					<input type='checkbox' className='rounded' value={facility} checked={selectedFacilities.includes(facility)} onChange={onChange} />
					<span>{facility}</span>
				</label>
			))}
		</div>
	);
};

export default FacilitiesFilter;
