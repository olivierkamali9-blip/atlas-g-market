import React, { useState } from 'react';

const AtlasSearch = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Rechercher les annonces correspondant à la query
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search-query">Rechercher</label>
      <input id="search-query" type="search" placeholder="Que cherches-tu ?" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button className="atlas-btn" type="submit">Rechercher</button>
    </form>
  );
};

export default AtlasSearch;
