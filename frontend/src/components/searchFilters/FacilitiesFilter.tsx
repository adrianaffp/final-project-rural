import { propertyFacilities } from '../../config/propertyOptionsConfig';

type Props = {
	selectedFacilities: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
	return (
		<div className='border-b border-gray-200 pb-5'>
			<h4 className='font-semibold text-sm mb-2'>Facilities</h4>

			{propertyFacilities.map(facility => (
				<label className='flex items-center space-x-2 text-sm font-light mb-1'>
					<input type='checkbox' className='rounded cursor-pointer' value={facility} checked={selectedFacilities.includes(facility)} onChange={onChange} />
					<span>{facility}</span>
				</label>
			))}
		</div>
	);
};

export default FacilitiesFilter;
