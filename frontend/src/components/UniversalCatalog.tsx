import React, { useState } from 'react';
import '../styles/universal-catalog.css';
import { UniversalSidebar, CategoryGroup } from './UniversalSidebar';

export interface UniversalListing {
  id: string;
  title: string;
  type: 'offre' | 'demande' | 'emploi' | 'service';
  condition?: 'neuf' | 'occasion';
  price: string;
  location: string;
  category: string;
  imageUrl?: string;
  date: string;
}

const DEFAULT_CATEGORIES: CategoryGroup[] = [
  {
    title: 'Produits & Biens',
    items: [
      { id: 'elec', name: 'Électronique & High-Tech', count: 142 },
      { id: 'vehicules', name: 'Véhicules & Auto', count: 89 },
      { id: 'maison', name: 'Maison & Mobilier', count: 64 },
    ],
  },
  {
    title: 'Emploi & Services',
    items: [
      { id: 'offres_emploi', name: 'Offres d\'emploi', count: 53 },
      { id: 'demandes_emploi', name: 'Recherche d\'emploi', count: 28 },
      { id: 'prestations', name: 'Services & Prestations', count: 91 },
    ],
  },
];

const MOCK_LISTINGS: UniversalListing[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro 128Go - Excellent état',
    type: 'offre',
    condition: 'occasion',
    price: '550 €',
    location: 'Paris (75)',
    category: 'elec',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    date: 'Aujourd\'hui'
  },
  {
    id: '2',
    title: 'Recherche Développeur React / Node.js Freelance',
    type: 'demande',
    price: '450 € / jour',
    location: 'Télétravail / Lyon',
    category: 'offres_emploi',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
    date: 'Hier'
  },
  {
    id: '3',
    title: 'Peugeot 208 Essence - 2021 - 45 000 km',
    type: 'offre',
    condition: 'occasion',
    price: '11 900 €',
    location: 'Bordeaux (33)',
    category: 'vehicules',
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400',
    date: '12 Août 2026'
  }
];

export const UniversalCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'tous' | 'offres' | 'demandes' | 'emplois'>('tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = MOCK_LISTINGS.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (activeFilter === 'offres' && item.type !== 'offre') return false;
    if (activeFilter === 'demandes' && item.type !== 'demande') return false;
    if (activeFilter === 'emplois' && item.type !== 'emploi') return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="atlas-catalog-container">
      <UniversalSidebar
        categories={DEFAULT_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="atlas-main-content">
        <div className="atlas-search-bar">
          <input
            type="text"
            className="atlas-search-input"
            placeholder="Que cherchez-vous aujourd'hui ? (Ex: iPhone, Développeur, Canapé...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="atlas-btn-primary">Rechercher</button>
        </div>

        <div className="atlas-filters-bar">
          <div className="atlas-filter-pills">
            <button
              className={`atlas-pill ${activeFilter === 'tous' ? 'active' : ''}`}
              onClick={() => setActiveFilter('tous')}
            >
              Tous les résultats
            </button>
            <button
              className={`atlas-pill ${activeFilter === 'offres' ? 'active' : ''}`}
              onClick={() => setActiveFilter('offres')}
            >
              Offres
            </button>
            <button
              className={`atlas-pill ${activeFilter === 'demandes' ? 'active' : ''}`}
              onClick={() => setActiveFilter('demandes')}
            >
              Demandes
            </button>
          </div>

          <span style={{ fontSize: '0.85rem', color: 'var(--atlas-text-muted)' }}>
            {filteredListings.length} annonce(s) disponible(s)
          </span>
        </div>

        <div className="atlas-grid">
          {filteredListings.map((item) => (
            <div key={item.id} className="atlas-card">
              <img
                src={item.imageUrl || 'https://via.placeholder.com/300x200?text=Atlas+G-Market'}
                alt={item.title}
                className="atlas-card-image"
              />
              <div className="atlas-card-body">
                <div className="atlas-card-tags">
                  <span className={`atlas-tag ${item.type === 'offre' ? 'atlas-tag-supply' : 'atlas-tag-demand'}`}>
                    {item.type}
                  </span>
                  {item.condition && (
                    <span className="atlas-tag" style={{ background: '#f1f5f9', color: '#475569' }}>
                      {item.condition}
                    </span>
                  )}
                </div>
                <h3 className="atlas-card-title">{item.title}</h3>
                <div className="atlas-card-price">{item.price}</div>
                <div className="atlas-card-location">📍 {item.location} • {item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};