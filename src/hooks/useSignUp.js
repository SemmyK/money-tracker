import { useEffect, useState } from 'react'
//firebase, firestore and authentication
import { auth, db } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore'
//hooks
import useAuthContext from './useAuthContext'

function useSignUp() {
	const [isCancelled, setIsCancelled] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
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
	}, [isCancelled, authUser])

	const signup = async (email, password, displayName, data) => {
		setLoading(true)
		setError(null)

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			console.log(user)
			if (!user) {
				throw new Error('Could not complete signup')
			}

			//add display name to user
			await updateProfile(auth.currentUser, { displayName: displayName })

			//dispatch login action
			dispatch({ type: 'LOGIN', payload: user })

			const userDocRef = doc(db, 'users', user.uid)
			//create user document in firestore
			await setDoc(userDocRef, {
				...data,
				userUID: user.uid,
				email,
				displayName,
				createdAt: serverTimestamp(),
			})

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

	return { loading, error, authUser, userDoc, signup }
}
export default useSignUp
