import React, { useState } from 'react';
import { Search, Filter, Tag, MapPin, DollarSign } from 'lucide-react';

export interface SearchFilters {
  query: string;
  category: string;
  type: 'product' | 'service' | 'job' | 'all';
  condition: 'new' | 'used' | 'any';
  location: string;
  minPrice: number | '';
  maxPrice: number | '';
}

export const AtlasSearch: React.FC<{ onSearch: (filters: SearchFilters) => void }> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    type: 'all',
    condition: 'any',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 max-w-5xl mx-auto my-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Barre de recherche principale */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="query"
              placeholder="Que cherchez-vous ? (Produits, emplois, services, matériel...)"
              value={filters.query}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="relative w-full md:w-64">
            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="location"
              placeholder="Localisation / Ville"
              value={filters.location}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-150 flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            Rechercher
          </button>
        </div>

        {/* Filtres avancés */}
        <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Catégorie</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              <option value="vehicles">Véhicules & Auto</option>
              <option value="real_estate">Immobilier</option>
              <option value="jobs">Emploi & Recrutement</option>
              <option value="electronics">Multimédia & High-Tech</option>
              <option value="services">Services & Prestations</option>
              <option value="home">Maison & Jardin</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Type d'offre</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="w-full p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous types</option>
              <option value="product">Produit physique</option>
              <option value="service">Service / Prestation</option>
              <option value="job">Offre d'emploi</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">État</label>
            <select
              name="condition"
              value={filters.condition}
              onChange={handleChange}
              className="w-full p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="any">Neuf ou Occasion</option>
              <option value="new">Neuf / Intact</option>
              <option value="used">Occasion / Seconde main</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Budget / Prix (€)</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleChange}
                className="w-1/2 p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleChange}
                className="w-1/2 p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};