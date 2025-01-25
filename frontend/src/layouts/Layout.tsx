import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<SearchBar />
			<div className='container mx-auto px-2 lg:px-0 py-3 flex-1'>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
