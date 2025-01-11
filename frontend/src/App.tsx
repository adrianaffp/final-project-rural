import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Single from './layouts/Single';
import ListProperty from './pages/ListProperty';
import { useAppContext } from './contexts/AppContext';
import MyProperty from './pages/MyProperty';
import EditProperty from './pages/EditProperty';

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
								<p>Home Page</p>
							</Layout>
						}
					/>
					<Route
						path='/search'
						element={
							<Layout>
								<p>Search Page</p>
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
								path='/my-property'
								element={
									<Single>
										<MyProperty />
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
						</>
					)}
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
