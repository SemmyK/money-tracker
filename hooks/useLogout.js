import { useEffect, useState } from 'react'
//firebase and authentication
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
//hooks
import useAuthContext from './useAuthContext'

function useLogout() {
	const [isCancelled, setIsCancelled] = useState(false)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { dispatch } = useAuthContext()

	const logout = async () => {
		setError(null)
		setLoading(true)

		try {
			await signOut(auth)
			dispatch({ type: 'LOGOUT' })

			if (!isCancelled) {
				setLoading(false)
				setError(null)
			}
		} catch (error) {
			console.log(error)
			if (!isCancelled) {
				setError(error.message)
				setLoading(false)
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true)
	}, [])

	return { logout, loading, error }
}
export default useLogout
