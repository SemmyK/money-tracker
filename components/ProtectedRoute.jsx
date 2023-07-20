import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ user }) {
	return !user ? <Outlet /> : <Navigate to='/' />
}
export default ProtectedRoute
