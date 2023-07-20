import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//style
import styles from './Signup.module.css'
//hooks
import useSignUp from '../../hooks/useSignUp'
//components
import { SyncLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function Signup() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [displayName, setDisplayName] = useState('')
	const { loading, error, signup } = useSignUp()

	const handleSubmit = async e => {
		e.preventDefault()
		console.log(email, password, displayName)
		try {
			await signup(email, password, displayName)
			toast.success('Welcome, ' + displayName)
			setDisplayName('')
			setEmail('')
			setPassword('')
		} catch (err) {
			console.log(err)
			toast.error(err.message)
		}
		navigate('/')
	}

	if (error) {
		toast.error('Something went wrong.')
	}

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<SyncLoader size='50px' />
			</div>
		)
	} else {
		return (
			<form onSubmit={handleSubmit} className={styles['signup-form']}>
				<h2>sign up</h2>
				<label>
					<span>email:</span>
					<input
						type='email'
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</label>
				<label>
					<span>password:</span>
					<input
						type='password'
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</label>
				<label>
					<span>display name:</span>
					<input
						type='text'
						onChange={e => setDisplayName(e.target.value)}
						value={displayName}
					/>
				</label>
				<button className='btn'>Sign up</button>
			</form>
		)
	}
}
export default Signup
