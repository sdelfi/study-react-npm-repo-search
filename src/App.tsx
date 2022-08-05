import RepositoriesList from './components/Repositories/RepositoriesList';
import SearchForm from './components/SearchForm/SearchForm';
import { useState } from 'react';

function App() {
	const [searchTerm, setSearchTerm] = useState<string>('');

	return (
		<div className="App">
			<SearchForm onSearch={setSearchTerm} />
			<RepositoriesList searchTerm={searchTerm} />
		</div>
	);
}

export default App;
