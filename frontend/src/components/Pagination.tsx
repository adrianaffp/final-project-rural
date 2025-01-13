export type Props = {
	page: number;
	pages: number;
	onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
	const pageNumbers = [];

	for (let i = 1; i <= pages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className='flex justify-center'>
			<ul className='flex border border-slate-300 rounded-2xl p-1 gap-1 font-light text-slate-500'>
				{pageNumbers.map(number => (
					<li className={`px-2 py-1 ${number === page ? 'bg-slate-300 rounded-full p-1 text-slate-800' : ''}`} key={number}>
						<button onClick={() => onPageChange(number)}>{number}</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Pagination;
