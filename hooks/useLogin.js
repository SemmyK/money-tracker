import { useEffect, useState } from 'react'
//firebase, authentication and firestore
import { auth, db } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
//hooks
import useAuthContext from './useAuthContext'

function useLogin() {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [isCancelled, setIsCancelled] = useState(false)
	const [authUser, setAuthUser] = useState(null)
	const [userDoc, setUserDoc] = useState(null)
	const { dispatch } = useAuthContext()

	useEffect(() => {
		if (!isCancelled) {
			const addUser = async () => {
				setLoading(true)
				try {
					if (auth.currentUser) {
						console.log(auth.currentUser)
						if (!isCancelled) {
							setAuthUser(auth.currentUser)
						}

						if (authUser) {
							const userDocRef = doc(db, 'users', authUser.userUID)

							const docSnap = await getDoc(userDocRef)
							if (docSnap.exists()) {
								const userData = docSnap.data()
								console.log(userData)
								if (!isCancelled) {
									userData && setUserDoc({ id: authUser.userUID, ...userData })
								}
							} else {
								setError(new Error('Document not found'))
							}
						}
					}
					if (!isCancelled) {
						setLoading(false)
					}
				} catch (error) {
					if (!isCancelled) {
						setError(error.message)
						setLoading(false)
						setAuthUser(null)
						setUserDoc(null)
					}
				}
			}

			addUser()
		}

		return () => setIsCancelled(true)
	}, [authUser, isCancelled])

	const signin = async (email, password) => {
		setLoading(true)
		setError(null)

		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password)

			console.log(user)
			if (!user) {
				throw new Error('Could not complete signin')
			}

			//dispatch login action
			dispatch({ type: 'LOGIN', payload: user })

			if (!isCancelled) {
				setLoading(false)
				setError(null)
			}
		} catch (error) {
			console.log(error)
			if (!isCancelled) {
				setError(error.message)
				setLoading(false)
				setAuthUser(null)
				setUserDoc(null)
			}
		}
	}

	return { loading, error, authUser, userDoc, signin }
}
export default useLogin
