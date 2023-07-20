import { useEffect, useReducer, useState } from 'react'
//firebase and firestore
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'

let initialState = {
	document: null,
	isPending: false,
	error: null,
	success: null,
}

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return {
				isPending: true,
				document: null,
				success: null,
				error: null,
			}
		case 'ERROR':
			return {
				document: null,
				error: action.payload,
				isPending: false,
				success: false,
			}
		case 'ADD':
			return {
				document: action.payload,
				isPending: false,
				success: true,
				error: null,
			}
		case 'DELETE':
			return {
				document: null,
				isPending: false,
				success: true,
				error: null,
			}
		default:
			return state
	}
}

function useFirestore(collectionName) {
	const [isCancelled, setIsCancelled] = useState(false)
	const [response, dispatch] = useReducer(firestoreReducer, initialState)

	//colection reference
	const collectionRef = collection(db, collectionName)

	//add document
	const addDocument = async document => {
		dispatch({ type: 'IS_PENDING' })

		try {
			// Add a new document with a generated id
			const newDocRef = await addDoc(collectionRef, {
				...document,
				createdAt: serverTimestamp(),
			})
			if (!isCancelled) {
				dispatch({ type: 'ADD', payload: newDocRef })
			}
		} catch (error) {
			console.log(error)
			if (!isCancelled) {
				dispatch({ type: 'ERROR', payload: error.message })
			}
		}
	}

	//delete document
	const deleteDocument = async id => {
		dispatch({ type: 'IS_PENDING' })

		try {
			//delete document
			await deleteDoc(doc(db, collectionName, id))

			if (!isCancelled) {
				dispatch({ type: 'DELETE' })
			}
		} catch (error) {
			console.log(error)
			if (!isCancelled) {
				dispatch({ type: 'ERROR', payload: error.message })
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true)
	}, [])

	return { addDocument, deleteDocument, response }
}
export default useFirestore
