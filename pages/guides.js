import { useEffect, useState } from 'react';
import { useAuthContext } from '../stores/authContext';
import styles from '../styles/Guides.module.css';

export default function Guides() {
	const { user, authReady } = useAuthContext();
	const [guides, setGuides] = useState(null);
	const [error, setError] = useState(false);

	const fetchMario = async () => {
		try {
			const res = await fetch(
				'.netlify/functions/guides',
				user && {
					headers: {
						Authorization: 'Bearer ' + user.token.access_token,
					},
				}
			);

			if (!res.ok) {
				throw new Error(`User not logged in`);
			}

			const data = await res.json();
			setGuides(data);
			setError(false);
			console.log(data);
		} catch (err) {
			console.error(err.message);
			setError(err.message);
			setGuides(null);
		}
	};

	useEffect(() => {
		if (authReady) {
			fetchMario();
		}
	}, [user, authReady]);

	return (
		<div className={styles.guides}>
			{!authReady && <div>Loading...</div>}
			{error && (
				<div className={styles.error}>
					<p>{error}</p>
				</div>
			)}
			{guides &&
				guides.map((guide) => (
					<div className={styles.card} key={guide.title}>
						<h3>{guide.title}</h3>
						<h4>written by {guide.author}</h4>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
							repellendus! Hic veniam ipsam doloribus sunt numquam corporis voluptas
							harum accusantium.
						</p>
					</div>
				))}
		</div>
	);
}
