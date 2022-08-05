import { FC, useEffect } from "react";
import { useAppSelector, repositoriesSelect, useAppDispatch, repositoriesActions } from "../../state";
import styles from "./Repositories.module.css";
interface Props {
  searchTerm: string;
}

const RepositoriesList: FC<Props> = ({ searchTerm }) => {
  const dispatch = useAppDispatch();
  const { loading, error, data: repositories } = useAppSelector(repositoriesSelect);
  // const { searchRepositoriesSuccess, searchRepositories } = useActions();

  useEffect(() => {
    if (searchTerm === "") {
      dispatch(repositoriesActions.searchRepositoriesSuccess([]));
    } else {
      dispatch(repositoriesActions.searchRepositories(searchTerm));
    }
  }, [dispatch, searchTerm]);

  return (
    <div className={styles.list}>
      {loading && <p className={styles.loading}>Loading</p>}
      {error && <p>Error {error}</p>}
      {!loading &&
        !error &&
        repositories.length > 0 &&
        repositories.map((repository) => (
          <a target="_blank" rel="noreferrer" href={repository.package.links.repository} className={styles.listItem} key={repository.package.name}>
            <span className={styles.name}>{repository.package.name}</span>
          </a>
        ))}
    </div>
  );
};

export default RepositoriesList;
