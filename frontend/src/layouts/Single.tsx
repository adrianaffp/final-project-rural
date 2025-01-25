import Footer from '../components/Footer';
import Header from '../components/Navbar';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='container mx-auto px-2 lg:px-0 py-10 flex-1'>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
