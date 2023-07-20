//style
import styles from './Home.module.css'
//hooks
import useAuthContext from '../../hooks/useAuthContext'
import useCollection from '../../hooks/useCollection'
//components
import TransactionForm from '../../components/TransactionForm'
import TransactionList from '../../components/TransactionList'

function Home() {
	const { user } = useAuthContext()
	const { documents, error } = useCollection(
		'transactions',
		['createdBy', '==', user.uid],
		['createdAt', 'desc']
	)
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{error && <p>{error}</p>}
				{documents && <TransactionList transactions={documents} />}
			</div>
			<div className={styles.sidebar}>
				<TransactionForm user={user} />
			</div>
		</div>
	)
}
export default Home
