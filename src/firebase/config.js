// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDqi1p_1gZldvzvubjOqW7ib4O7hyBdWtg',
	authDomain: 'money-tracker-ef7a3.firebaseapp.com',
	projectId: 'money-tracker-ef7a3',
	storageBucket: 'money-tracker-ef7a3.appspot.com',
	messagingSenderId: '170063738899',
	appId: '1:170063738899:web:9ab623e0a2db7831f127e6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
export default app
