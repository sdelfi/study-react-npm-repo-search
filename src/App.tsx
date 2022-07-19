import './App.css';
import RepositoriesList from './components/Repositories/RepositoriesList';
import SearchForm from './components/SearchForm/SearchForm';
import { useCallback, useState } from 'react';

function App() {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const onSearch = useCallback((searchQuery: string) => {
		setSearchTerm(searchQuery);
	}, []);

	return (
		<div className="App">
			<SearchForm onSearch={onSearch} />
			<RepositoriesList searchTerm={searchTerm} />
		</div>
	);
}

export default App;
