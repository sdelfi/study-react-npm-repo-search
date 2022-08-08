import React, { FC, useCallback, useEffect, useState } from 'react';

import useDebounce from '../../hooks/useDebounce';
import styles from './SearchForm.module.css';

interface Props {
  onSearch: (searchQuery: string) => void;
}

const SearchForm: FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const debouncedValue = useDebounce(query, 300);

  const onInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }, []);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <form className={styles.form}>
      <input
        className={styles.formInput}
        type="text"
        value={query}
        onChange={onInputChangeHandler}
        placeholder="Enter search string"
      />
    </form>
  );
};

export default React.memo(SearchForm);
