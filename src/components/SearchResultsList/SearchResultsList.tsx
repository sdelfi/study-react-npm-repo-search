import React, { useEffect } from 'react';

import { repositoriesActions, repositoriesSelect, useAppDispatch, useAppSelector } from '../../state';
import styles from './SearchResultsList.module.css';

interface Props {
  searchTerm: string;
}

const SearchResultsList: React.FC<Props> = ({ searchTerm }) => {
  const dispatch = useAppDispatch();
  const { loading, error, data: repositories } = useAppSelector(repositoriesSelect);
  // const { searchRepositoriesSuccess, searchRepositories } = useActions();

  useEffect(() => {
    if (searchTerm === '') {
      dispatch(repositoriesActions.searchRepositoriesSuccess([]));
    } else {
      dispatch(repositoriesActions.searchRepositories(searchTerm));
    }
  }, [dispatch, searchTerm]);

  return (
    <ul className={styles.list}>
      {loading && <li className={styles.loading}>Loading</li>}
      {error && <li className={styles.error}>Error {error}</li>}
      {!loading &&
        !error &&
        repositories.length > 0 &&
        repositories.map((repository) => (
          <li key={repository.package.name} className={styles.listItem}>
            <a target="_blank" rel="noreferrer" href={repository.package.links.repository} className={styles.repoName}>
              {repository.package.name}
            </a>
          </li>
        ))}
    </ul>
  );
};

export default SearchResultsList;
