import React, { useState } from 'react';

export interface CatalogItem {
  id: string;
  type: 'OFFER' | 'DEMAND';
  category: string;
  title: string;
  price: string;
  location: string;
  condition: 'NEUF' | 'OCCASION' | 'SERVICE' | 'CDI/CDD';
  image: string;
  vendorName: string;
  vendorBadge: 'Pro' | 'Particulier' | 'Vérifié';
  phone: string;
  publishedAt: string;
}

const SAMPLE_CATALOG: CatalogItem[] = [
  {
    id: '1',
    type: 'OFFER',
    category: 'electronics',
    title: 'MacBook Pro M2 16" 512GB - État Neuf sous Garantie',
    price: '1 450 000 FCFA',
    location: 'Abidjan, Cocody',
    condition: 'NEUF',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    vendorName: 'G-Tech Store',
    vendorBadge: 'Pro',
    phone: '+2250700000001',
    publishedAt: 'Il y a 10 min',
  },
  {
    id: '2',
    type: 'DEMAND',
    category: 'jobs',
    title: 'Recherche Développeur Fullstack React / Node.js urgent',
    price: '600 000 FCFA / mois',
    location: 'Dakar, Plateau / Télétravail',
    condition: 'CDI/CDD',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',
    vendorName: 'Cabinet RH Sahel',
    vendorBadge: 'Vérifié',
    phone: '+221770000002',
    publishedAt: 'Il y a 25 min',
  },
  {
    id: '3',
    type: 'OFFER',
    category: 'vehicles',
    title: 'Toyota RAV4 2021 Automatique Climatisation d\'origine',
    price: '14 500 000 FCFA',
    location: 'Lomé, Zone Industrielle',
    condition: 'OCCASION',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80',
    vendorName: 'Auto Direct Direct',
    vendorBadge: 'Pro',
    phone: '+22890000003',
    publishedAt: 'Il y a 1h',
  },
  {
    id: '4',
    type: 'DEMAND',
    category: 'real_estate',
    title: 'Cherche Appartement 3 Pièces à louer à Akwa',
    price: 'Budget max 250 000 FCFA',
    location: 'Douala, Akwa',
    condition: 'SERVICE',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80',
    vendorName: 'Marc A.',
    vendorBadge: 'Particulier',
    phone: '+237600000004',
    publishedAt: 'Il y a 2h',
  },
];

interface MixedCatalogProps {
  selectedCategory: string | null;
  onContactClick: (item: CatalogItem, mode: 'chat' | 'call') => void;
}

export const MixedCatalog: React.FC<MixedCatalogProps> = ({
  selectedCategory,
  onContactClick,
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'OFFER' | 'DEMAND'>('ALL');

  const filteredItems = SAMPLE_CATALOG.filter((item) => {
    const matchesCat = selectedCategory ? item.category === selectedCategory : true;
    const matchesType = filterType === 'ALL' ? true : item.type === filterType;
    return matchesCat && matchesType;
  });

  return (
    <div className="flex-1 space-y-4">
      {/* Filters Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 text-sm">Filtrer par type :</span>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 text-xs font-medium rounded-l-lg border ${
                filterType === 'ALL'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Tout ({SAMPLE_CATALOG.length})
            </button>
            <button
              onClick={() => setFilterType('OFFER')}
              className={`px-3 py-1.5 text-xs font-medium border-t border-b ${
                filterType === 'OFFER'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Offres (Ventes / Emplois)
            </button>
            <button
              onClick={() => setFilterType('DEMAND')}
              className={`px-3 py-1.5 text-xs font-medium rounded-r-lg border ${
                filterType === 'DEMAND'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Demandes (Achats / Recherches)
            </button>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Affichage de <span className="font-semibold text-gray-800">{filteredItems.length}</span> opportunités
        </div>
      </div>

      {/* Grid of Catalog Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col sm:flex-row"
          >
            {/* Thumbnail */}
            <div className="relative sm:w-2/5 h-48 sm:h-auto bg-gray-100 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider text-white ${
                  item.type === 'OFFER' ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
              >
                {item.type === 'OFFER' ? 'Offre' : 'Demande'}
              </span>
              <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                {item.condition}
              </span>
            </div>

            {/* Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>📍 {item.location}</span>
                  <span>{item.publishedAt}</span>
                </div>

                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 hover:text-emerald-700 cursor-pointer">
                  {item.title}
                </h3>

                <p className="text-lg font-bold text-emerald-600 mt-2">
                  {item.price}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="font-medium text-gray-800">{item.vendorName}</span>
                  <span
                    className={`px-1.5 py-0.2 text-[10px] rounded font-semibold ${
                      item.vendorBadge === 'Pro'
                        ? 'bg-blue-100 text-blue-700'
                        : item.vendorBadge === 'Vérifié'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    ✓ {item.vendorBadge}
                  </span>
                </div>
              </div>

              {/* Direct Contact Action Buttons */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                <button
                  onClick={() => onContactClick(item, 'chat')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 px-3 rounded font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <span>💬</span> Message direct
                </button>
                <button
                  onClick={() => onContactClick(item, 'call')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-2 px-3 rounded font-medium flex items-center justify-center gap-1 transition-colors"
                  title="Appeler ou WhatsApp"
                >
                  <span>📞</span> Appeler
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};