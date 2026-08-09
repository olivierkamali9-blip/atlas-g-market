import React, { useState } from 'react';

const AtlasSearch = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Rechercher les annonces correspondant à la query
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rechercher :
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default AtlasSearch;