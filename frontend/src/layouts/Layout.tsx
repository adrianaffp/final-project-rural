import Footer from '../components/Footer';
import Header from '../components/Navbar';
import SearchBar from '../components/SearchBar';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<SearchBar/>	
			<div className='container mx-auto py-3 flex-1'>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
