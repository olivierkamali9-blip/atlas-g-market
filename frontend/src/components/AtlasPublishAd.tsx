import React, { useState } from 'react';

const AtlasPublishAd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Enregistrer l'annonce
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ad-title">Titre</label>
      <input id="ad-title" type="text" placeholder="Titre de l'annonce" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="ad-desc">Description</label>
      <textarea id="ad-desc" rows={4} placeholder="Décris ton annonce" value={description} onChange={(e) => setDescription(e.target.value)} />
      <label htmlFor="ad-cat">Catégorie</label>
      <input id="ad-cat" type="text" placeholder="Ex : Électronique, Immobilier..." value={category} onChange={(e) => setCategory(e.target.value)} />
      <button className="atlas-btn" type="submit">Publier</button>
    </form>
  );
};

export default AtlasPublishAd;
