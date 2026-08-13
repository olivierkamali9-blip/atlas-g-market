import React, { useState } from 'react';
import { AdCard, AdItem } from './AdCard';

const SAMPLE_ADS: AdItem[] = [
  {
    id: '1',
    title: 'Poste Développeur Fullstack React / Node',
    category: 'Emploi & CDI',
    type: 'offre',
    condition: 'emploi',
    price: '45k - 55k €/an',
    location: 'Paris (Télétravail)',
    description: 'Nous recherchons un développeur motivé pour rejoindre notre équipe Atlas G-market.',
    contactPhone: '+33 6 12 34 56 78',
    contactEmail: 'recrutement@gtech.com',
    createdAt: 'Aujourd\'hui',
  },
  {
    id: '2',
    title: 'MacBook Pro M2 16" 1To - Parfait État',
    category: 'Informatique',
    type: 'offre',
    condition: 'occasion',
    price: '1 850 €',
    location: 'Lyon',
    description: 'Ordinateur portable comme neuf, servi 4 mois. Facture et garantie fournies.',
    contactPhone: '+33 6 98 76 54 32',
    contactEmail: 'vendeur.mac@gmail.com',
    createdAt: 'Hier',
  },
  {
    id: '3',
    title: 'Recherche plombier pour rénovation salle de bain',
    category: 'Services & BTP',
    type: 'demande',
    condition: 'service',
    price: 'Sur devis',
    location: 'Bordeaux',
    description: 'Cherche un artisan qualifié pour poser une douche à l\'italienne dans le centre-ville.',
    contactPhone: '+33 6 44 55 66 77',
    contactEmail: 'client.bordeaux@yahoo.fr',
    createdAt: 'Il y a 2 jours',
  },
  {
    id: '4',
    title: 'Appartement T3 meublé avec balcon',
    category: 'Immobilier',
    type: 'offre',
    condition: 'occasion',
    price: '950 €/mois',
    location: 'Nantes',
    description: 'Bel appartement traversant, proche des transports et des commerces.',
    contactPhone: '+33 6 11 22 33 44',
    contactEmail: 'immo.nantes@agence.fr',
    createdAt: 'Il y a 3 jours',
  }
];

interface MixedCatalogProps {
  onOpenMessaging: (ad: AdItem) => void;
  onSelectAd: (ad: AdItem) => void;
}

export const MixedCatalog: React.FC<MixedCatalogProps> = ({ onOpenMessaging, onSelectAd }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Toutes', 'Emploi & CDI', 'Informatique', 'Services & BTP', 'Immobilier', 'Véhicules', 'Maison & Jardin'];

  const filteredAds = SAMPLE_ADS.filter((ad) => {
    const matchCategory = selectedCategory === 'Toutes' || ad.category === selectedCategory;
    const matchType = selectedType === 'all' || ad.type === selectedType;
    const matchSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ad.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchType && matchSearch;
  });

  return (
    <section className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Atlas G-market — Le grand catalogue universel
          </h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
            Tout chercher, tout proposer. Accédez directement aux offres, emplois, services et biens sans barrière.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Ex: Développeur, MacBook, Plombier, Appartement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${selectedType === 'all' ? 'bg-white text-blue-900' : 'bg-blue-800/60 text-white hover:bg-blue-800'}`}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedType('offre')}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${selectedType === 'offre' ? 'bg-white text-blue-900' : 'bg-blue-800/60 text-white hover:bg-blue-800'}`}
              >
                Offres
              </button>
              <button
                onClick={() => setSelectedType('demande')}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${selectedType === 'demande' ? 'bg-white text-blue-900' : 'bg-blue-800/60 text-white hover:bg-blue-800'}`}
              >
                Demandes
              </button>
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            {filteredAds.length} annonce(s) disponible(s) en accès libre
          </h2>
          <span className="text-xs text-slate-500">Contact direct & messagerie instantanée</span>
        </div>

        {filteredAds.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">Aucune annonce ne correspond à votre recherche.</p>
            <button
              onClick={() => { setSelectedCategory('Toutes'); setSelectedType('all'); setSearchQuery(''); }}
              className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAds.map((ad) => (
              <AdCard
                key={ad.id}
                ad={ad}
                onOpenMessaging={onOpenMessaging}
                onSelectAd={onSelectAd}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};