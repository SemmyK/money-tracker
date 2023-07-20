import { useEffect, useRef, useState } from 'react'
//firebase and firestore
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
import { db } from '../firebase/config'

function useCollection(
	collectionName,
	_condition,
	_orderData = ['createdAt', 'desc']
) {
	const [documents, setDocuments] = useState(null)
	const [error, setError] = useState(null)
	const condition = useRef(_condition).current
	const orderData = useRef(_orderData).current

	useEffect(() => {
		//colection reference
		let collectionRef = collection(db, collectionName)

		const q = condition
			? query(collectionRef, where(...condition), orderBy(...orderData))
			: query(collectionRef, orderBy(...orderData))

		const unsub = onSnapshot(
			q,
			snapshot => {
				let results = []
				snapshot.docs.forEach(item =>
					results.push({ ...item.data(), id: item.id })
				)

				setDocuments(results)
				setError(null)
			},
			error => {
				console.log(error)
				setError('Could not fetch data.')
			}
		)

		return () => unsub()
	}, [collectionName, condition, orderData])

	return { documents, error }
}
export default useCollection
