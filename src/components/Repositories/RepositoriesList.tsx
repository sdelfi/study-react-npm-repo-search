import { FC, useEffect } from 'react';
import { repositoriesActions, repositoriesSelect } from '../../state';
import { useAppDispatch, useAppSelector } from '../../state/store';
import styles from './Repositories.module.css';

interface Props {
	searchTerm: string;
}

const RepositoriesList: FC<Props> = ({ searchTerm }) => {
	const dispatch = useAppDispatch();
	const repositories = useAppSelector(repositoriesSelect);

	useEffect(() => {
		if (searchTerm === '') {
			dispatch(repositoriesActions.searchRepositoriesSuccess([]));
		} else {
			dispatch(repositoriesActions.searchRepositories(searchTerm));
		}
	}, [dispatch, searchTerm]);

	return (
		<div className={styles.list}>
			{repositories.loading && <p>Loading</p>}
			{repositories.error && <p>Error {repositories.error}</p>}
			{!repositories.loading &&
				!repositories.error &&
				repositories.data.length > 0 &&
				repositories.data.map((repository) => (
					<div className={styles.listItem} key={repository.package.name}>
						<p className={styles.name}>{repository.package.name}</p>
					</div>
				))}
		</div>
	);
};

export default RepositoriesList;
