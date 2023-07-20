import { BrowserRouter, Route, Routes } from 'react-router-dom'
//hooks
import useAuthContext from './hooks/useAuthContext'
//pages
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
//components
import Navbar from './components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'
import PrivateRoute from './components/PrivateRoute'
//style
import 'react-toastify/dist/ReactToastify.css'

function App() {
	const { authIsReady, user } = useAuthContext()

	return (
		<BrowserRouter>
			{authIsReady && (
				<div className='App'>
					<header>
						<Navbar />
					</header>
					<main>
						<Routes>
							{/* private route */}
							<Route path='/' element={<PrivateRoute user={user} />}>
								<Route path='/' element={<Home />} />
							</Route>

							{/* protected routes */}
							<Route path='/sign-up' element={<ProtectedRoute user={user} />}>
								<Route path='/sign-up' element={<Signup />} />
							</Route>

							<Route path='/login' element={<ProtectedRoute user={user} />}>
								<Route path='/login' element={<Login />} />
							</Route>
						</Routes>
						<ToastContainer />
					</main>
				</div>
			)}
		</BrowserRouter>
	)
}

export default App
