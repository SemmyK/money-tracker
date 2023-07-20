import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//style
import styles from './Login.module.css'
//hooks
import useLogin from '../../hooks/useLogin'

//components
import { SyncLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { signin, error, loading } = useLogin()

	const handleSubmit = async e => {
		e.preventDefault()
		console.log(email, password)
		try {
			await signin(email, password)
			toast.success('Login in successfull')
		} catch (error) {
			console.log(error)
			toast.error(error.message)
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
			<form onSubmit={handleSubmit} className={styles['login-form']}>
				<h2>login</h2>
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
				<button className='btn'>Login</button>
			</form>
		)
	}
}
export default Login
