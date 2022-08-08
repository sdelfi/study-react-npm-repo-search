import React, { useState } from 'react';

import SearchForm from './components/SearchForm/SearchForm';
import SearchResultsList from './components/SearchResultsList/SearchResultsList';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="app">
      <h1 className="projectTitle">NPM package search</h1>
      <SearchForm onSearch={setSearchTerm} />
      <SearchResultsList searchTerm={searchTerm} />
    </div>
  );
}

export default App;
