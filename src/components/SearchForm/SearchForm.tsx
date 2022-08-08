import React, { FC, useCallback, useEffect, useState } from 'react';

import styles from './SearchForm.module.css';

interface Props {
  onSearch: (searchQuery: string) => void;
}

const SearchForm: FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, onSearch]);

  // useDebounce(); custom hook

  const onSearchHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }, []);

  return (
    <form className={styles.form}>
      <input className={styles.formInput} type="text" value={query} onChange={onSearchHandler} placeholder="Enter search string" />
    </form>
  );
};

export default React.memo(SearchForm);
