import React, { useState } from 'react';

const AtlasPublishAd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Enregistrer l'annonce dans la base de données
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre :
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description :
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Catégorie :
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Sélectionner une catégorie</option>
          <option value="emploi">Emploi</option>
          <option value="produit">Produit</option>
          <option value="service">Service</option>
        </select>
      </label>
      <button type="submit">Publier</button>
    </form>
  );
};

export default AtlasPublishAd;