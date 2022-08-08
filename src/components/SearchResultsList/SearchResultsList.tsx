import React, { useEffect } from 'react';

import { createActionsHook } from '../../hooks/useActions';
import { repositoriesActions, repositoriesSelect, useAppSelector } from '../../state';
import styles from './SearchResultsList.module.css';

interface Props {
  searchTerm: string;
}

const useActions = createActionsHook<typeof repositoriesActions>(repositoriesActions);

const SearchResultsList: React.FC<Props> = ({ searchTerm }) => {
  const { loading, error, data: repositories } = useAppSelector(repositoriesSelect);
  const { searchRepositories } = useActions();

  useEffect(() => {
    searchRepositories(searchTerm);
  }, [searchTerm, searchRepositories]);

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
