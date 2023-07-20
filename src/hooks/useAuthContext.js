import { useContext } from 'react'
//context
import { AuthContext } from '../context/AuthContext'

function useAuthContext() {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('useAuthContext must be inside AuthCOntextProvider')
	}

	return context
}
export default useAuthContext
