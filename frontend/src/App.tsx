import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Single from './layouts/Single';

function App() {
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
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
