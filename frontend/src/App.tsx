import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { useAppContext } from './contexts/AppContext';

import Layout from './layouts/Layout';
import Single from './layouts/Single';

import Register from './pages/Register';
import SignIn from './pages/SignIn';
import ListProperty from './pages/ListProperty';
import MyProperty from './pages/MyProperty';
import EditProperty from './pages/EditProperty';
import Search from './pages/Search';
import PropertyDetail from './pages/PropertyDetail';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import HomePage from './pages/HomePage';
import MyFavorites from './pages/MyFavorites';

import Hero from './components/Hero';

function App() {
	const { isLoggedIn } = useAppContext();

	return (
		<>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<Layout>
								<Hero />
								<HomePage />
							</Layout>
						}
					/>
					<Route
						path='/search'
						element={
							<Layout>
								<Search />
							</Layout>
						}
					/>
					<Route
						path='/detail/:propertyId'
						element={
							<Layout>
								<PropertyDetail />
							</Layout>
						}
					/>
					<Route
						path='/register'
						element={
							<Single>
								<Register />
							</Single>
						}
					/>
					<Route
						path='/sign-in'
						element={
							<Single>
								<SignIn />
							</Single>
						}
					/>

					{isLoggedIn && (
						<>
							<Route
								path='/my-favorites'
								element={
									<Single>
										<MyFavorites />
									</Single>
								}
							/>
							<Route
								path='/my-property'
								element={
									<Single>
										<MyProperty />
									</Single>
								}
							/>
							<Route
								path='/my-bookings'
								element={
									<Single>
										<MyBookings />
									</Single>
								}
							/>
							<Route
								path='/list-property'
								element={
									<Single>
										<ListProperty />
									</Single>
								}
							/>
							<Route
								path='/edit-property/:propertyId'
								element={
									<Single>
										<EditProperty />
									</Single>
								}
							/>
							<Route
								path='/property/:propertyId/booking'
								element={
									<Single>
										<Booking />
									</Single>
								}
							/>
						</>
					)}
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
