import { Link } from 'react-router-dom'
//style
import styles from './Navbar.module.css'
//hooks
import useLogout from '../../hooks/useLogout'
import useAuthContext from '../../hooks/useAuthContext'

function Navbar() {
	const { logout } = useLogout()
	const { user } = useAuthContext()
	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.title}>
					<Link to='/'>myMoney</Link>
				</li>
				{!user && (
					<>
						<li>
							<Link to='/sign-up'>Sign up</Link>
						</li>
						<li>
							<Link to='/login'>Sign in</Link>
						</li>
					</>
				)}
				{user && (
					<>
						<li>hello, {user.displayName}</li>
						<li>
							<button className='btn' onClick={logout}>
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}
export default Navbar
