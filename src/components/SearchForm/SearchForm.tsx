import React, { FC, useState, useEffect, useCallback } from 'react'
import styles from './SearchForm.module.css'

interface Props {
  // searchQuery: string;
  onSearch: (searchQuery: string) => void;
}

const SearchForm: FC<Props> = ({ onSearch }) => {
    console.log('Render form')
    const [query, setQuery] = useState<string>('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(query)
        }, 300)

        return () => {
            clearTimeout(timeout)
        }
    }, [query, onSearch])

    const onSearchHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        e.preventDefault()
        setQuery(e.target.value)
    }, [])

    return (
        <div className={styles.form}>
            <input type="text" value={query} onChange={onSearchHandler} />
        </div>
    )
}

export default React.memo(SearchForm)
