import React, { useState } from 'react';

export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  type: 'offre' | 'demande';
  price: string;
  location: string;
  description: string;
  condition?: string;
}

const mockCatalogData: CatalogItem[] = [
  {
    id: '1',
    title: 'MacBook Pro M2 - 16 Go RAM',
    category: 'High-Tech & Produits',
    type: 'offre',
    price: '1 250 €',
    location: 'Paris (75)',
    description: 'En excellent état, fourni avec accessoires d\'origine et boite.',
    condition: 'Occasion (Comme neuf)'
  },
  {
    id: '2',
    title: 'Développeur Fullstack Senior React/Node',
    category: 'Emploi',
    type: 'offre',
    price: '48k - 55k €/an',
    location: 'Lyon (69) / Télétravail',
    description: 'Poste en CDI pour rejoindre une équipe dynamique sur une plateforme SaaS scale-up.',
    condition: 'CDI'
  },
  {
    id: '3',
    title: 'Recherche Cours Particuliers Mathématiques Terminale',
    category: 'Services & Enseignement',
    type: 'demande',
    price: '25 €/h',
    location: 'Bordeaux (33)',
    description: 'Cherche un enseignant ou étudiant qualifié pour suivi hebdomadaire.',
    condition: 'Besoin ponctuel'
  },
  {
    id: '4',
    title: 'Location Appartement T2 45m²',
    category: 'Immobilier',
    type: 'offre',
    price: '780 €/mois',
    location: 'Nantes (44)',
    description: 'Appartement rénové, cuisine américaine, balcon, disponible de suite.',
    condition: 'Location'
  }
];

export const CatalogMockupView: React.FC = () => {
  const [filterType, setFilterType] = useState<'tous' | 'offre' | 'demande'>('tous');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = mockCatalogData.filter(item => {
    const matchesType = filterType === 'tous' || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>🌐 Atlas G-market <span style={{ color: '#6366f1' }}>Catalogue</span></h1>
        <input
          type="text"
          placeholder="Rechercher tout (produit, job, service...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            width: '350px',
            borderRadius: '8px',
            border: '1px solid #475569',
            backgroundColor: '#1e293b',
            color: '#fff'
          }}
        />
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        {(['tous', 'offre', 'demande'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: filterType === t ? '#6366f1' : '#334155',
              color: '#fff',
              textTransform: 'capitalize'
            }}
          >
            {t === 'tous' ? 'Toutes les annonces' : t === 'offre' ? 'Offres uniquement' : 'Demandes uniquement'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filteredItems.map(item => (
          <div key={item.id} style={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #475569', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase' }}>{item.category}</span>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '12px',
                  backgroundColor: item.type === 'offre' ? '#10b981' : '#f59e0b',
                  color: '#fff',
                  textTransform: 'uppercase'
                }}>
                  {item.type}
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>{item.description}</p>
            </div>
            <div style={{ borderTop: '1px solid #475569', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>{item.price}</span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>📍 {item.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};