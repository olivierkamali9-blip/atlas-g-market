import React, { useState } from 'react';

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
  count?: number;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'electronics',
    name: 'Électronique & High-Tech',
    icon: '💻',
    subcategories: ['Téléphones & Tablettes', 'Informatique', 'TV & Audio', 'Accessoires'],
    count: 1420,
  },
  {
    id: 'jobs',
    name: 'Emploi & Prestations de Services',
    icon: '💼',
    subcategories: ['Offres d\'emploi', 'Demandes d\'emploi', 'Services B2B', 'Artisans & Dépannage'],
    count: 850,
  },
  {
    id: 'vehicles',
    name: 'Véhicules & Transport',
    icon: '🚗',
    subcategories: ['Voitures d\'occasion', 'Motos & Scooters', 'Pièces détachées', 'Location'],
    count: 620,
  },
  {
    id: 'real_estate',
    name: 'Immobilier & Maison',
    icon: '🏠',
    subcategories: ['Vente Appartements/Maisons', 'Location', 'Terrains', 'Meubles & Déco'],
    count: 940,
  },
  {
    id: 'fashion',
    name: 'Mode & Beauté',
    icon: '👕',
    subcategories: ['Vêtements Homme/Femme', 'Chaussures', 'Bijoux & Montres', 'Cosmétiques'],
    count: 1100,
  },
  {
    id: 'industrial',
    name: 'Matériel Pro & Industrie',
    icon: '🏗️',
    subcategories: ['Machines', 'Outillage', 'Fournitures de bureau', 'Stocks en gros'],
    count: 310,
  },
  {
    id: 'leisure',
    name: 'Loisirs, Sport & Divers',
    icon: '⚽',
    subcategories: ['Sport & Fitness', 'Jeux & Jouets', 'Livres & Musique', 'Animaux'],
    count: 480,
  },
];

interface SidebarCategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const SidebarCategories: React.FC<SidebarCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [activeHoverCategory, setActiveHoverCategory] = useState<string | null>(null);

  return (
    <aside className="w-full lg:w-64 bg-white rounded-lg shadow-sm border border-gray-200 relative">
      <div className="p-4 border-b border-gray-100 bg-emerald-700 text-white rounded-t-lg flex items-center justify-between">
        <h2 className="font-bold text-sm tracking-wide uppercase flex items-center gap-2">
          <span>☰</span> Catégories Atlas
        </h2>
        <span className="text-xs bg-emerald-800 px-2 py-0.5 rounded-full text-emerald-100 font-medium">
          Toutes
        </span>
      </div>

      <ul className="divide-y divide-gray-100">
        <li key="all">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors ${
              selectedCategory === null
                ? 'bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>🌟</span> Tous les articles & offres
            </span>
          </button>
        </li>

        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <li
              key={cat.id}
              className="relative group"
              onMouseEnter={() => setActiveHoverCategory(cat.id)}
              onMouseLeave={() => setActiveHoverCategory(null)}
            >
              <button
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </span>
                <span className="text-xs text-gray-400 group-hover:text-emerald-600">›</span>
              </button>

              {/* Flyout Submenu style Alibaba/Jumia */}
              {activeHoverCategory === cat.id && cat.subcategories && (
                <div className="hidden lg:block absolute left-full top-0 w-64 bg-white border border-gray-200 shadow-xl rounded-r-lg z-30 p-4 -ml-px">
                  <h3 className="font-bold text-xs uppercase text-emerald-800 tracking-wider mb-2 border-b pb-1">
                    {cat.name}
                  </h3>
                  <ul className="space-y-1.5">
                    {cat.subcategories.map((sub, idx) => (
                      <li key={idx}>
                        <a
                          href={`#${cat.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectCategory(cat.id);
                          }}
                          className="text-xs text-gray-600 hover:text-emerald-600 hover:underline block py-1"
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between items-center text-[11px] text-gray-400">
                    <span>{cat.count} annonces</span>
                    <span className="text-emerald-600 font-medium">Explorer →</span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};