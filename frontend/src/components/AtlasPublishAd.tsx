import React, { useState } from 'react';

interface AtlasPublishAdProps {
  currentUser?: { id: string; name: string; isAdult?: boolean } | null;
  onPublishSuccess?: (ad: any) => void;
  onLoginRequired?: () => void;
}

const CATEGORIES = [
  { id: 'electronics', label: 'Électronique & High-Tech', restricted: false },
  { id: 'jobs', label: 'Emploi & Services généraux', restricted: false },
  { id: 'real_estate', label: 'Immobilier & Logement', restricted: false },
  { id: 'vehicles', label: 'Véhicules & Auto', restricted: false },
  { id: 'services_18plus', label: 'Prestations spécialisées (18+)', restricted: true },
  { id: 'alcohol_tobacco', label: 'Produits réglementés (18+)', restricted: true }
];

export const AtlasPublishAd: React.FC<AtlasPublishAdProps> = ({
  currentUser,
  onPublishSuccess,
  onLoginRequired
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const selectedCat = CATEGORIES.find((c) => c.id === category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!currentUser) {
      setErrorMsg('Vous devez être connecté pour déposer une annonce.');
      if (onLoginRequired) onLoginRequired();
      return;
    }

    if (selectedCat?.restricted && !currentUser.isAdult) {
      setErrorMsg('Cette catégorie est strictement réservée aux utilisateurs âgés de 18 ans ou plus.');
      return;
    }

    try {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price) || 0,
          category
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la publication');
      }

      setSuccessMsg('Votre annonce a été publiée avec succès !');
      setTitle('');
      setDescription('');
      setPrice('');
      if (onPublishSuccess) onPublishSuccess(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Impossible de publier la petite annonce.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1.5rem', background: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#1B365D', marginBottom: '1rem', textAlign: 'center' }}>Déposer une annonce sur Atlas G-market</h2>

      {!currentUser && (
        <div style={{ backgroundColor: '#FFF3CD', color: '#856404', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
          <strong>Connexion requise :</strong> Vous devez être connecté pour pouvoir publier.
          <button
            onClick={onLoginRequired}
            style={{ marginLeft: '10px', background: 'transparent', border: 'none', color: '#0056b3', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Se connecter maintenant
          </button>
        </div>
      )}

      {errorMsg && (
        <div style={{ backgroundColor: '#F8D7DA', color: '#721C24', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div style={{ backgroundColor: '#D4EDDA', color: '#155724', padding: '0.75rem 1rem', borderRadius: '4px', marginBottom: '1rem' }}>
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Titre de l'annonce</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Ex: Ordinateur portable ou Service de bricolage"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Catégorie d'annonce</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label} {cat.restricted ? '(18+ uniquement)' : ''}
              </option>
            ))}
          </select>
          {selectedCat?.restricted && (
            <p style={{ color: '#D9534F', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              🔒 Cette catégorie nécessite une vérification d'âge (18 ans révolus).
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Prix (€)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0 pour gratuit / don"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Description détaillée</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            placeholder="Décrivez votre produit ou votre service..."
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          disabled={!currentUser}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: currentUser ? '#1B365D' : '#6C757D',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: currentUser ? 'pointer' : 'not-allowed'
          }}
        >
          Publier l'annonce
        </button>
      </form>
    </div>
  );
};