import React, { useState } from 'react';
import { atlasTheme } from '../styles/theme';

interface AtlasLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  unreadMessagesCount?: number;
}

export const AtlasLayout: React.FC<AtlasLayoutProps> = ({
  children,
  activeTab = 'search',
  onTabChange,
  unreadMessagesCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Toutes les catégories' },
    { id: 'products', label: 'Produits & Biens' },
    { id: 'jobs', label: 'Emplois & Missions' },
    { id: 'services', label: 'Services & Prestations' },
    { id: 'real_estate', label: 'Immobilier' },
    { id: 'vehicles', label: 'Véhicules' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange?.('search')}>
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                A
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">Atlas</span>
                <span className="text-xl font-extrabold text-sky-600"> G-market</span>
              </div>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => onTabChange?.('search')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'search'
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Explorer
              </button>
              <button
                onClick={() => onTabChange?.('publish')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'publish'
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Publier une annonce
              </button>
              <button
                onClick={() => onTabChange?.('messaging')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  activeTab === 'messaging'
                    ? 'bg-sky-50 text-sky-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Messagerie
                {unreadMessagesCount > 0 && (
                  <span className="ml-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Action CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => onTabChange?.('publish')}
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm transition-all"
              >
                + Publier
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-slate-100/80 border-t border-slate-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 py-2.5 text-xs font-medium text-slate-600 whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="hover:text-sky-600 transition-colors flex items-center gap-1"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => { onTabChange?.('search'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Explorer les annonces
            </button>
            <button
              onClick={() => { onTabChange?.('publish'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Publier une annonce
            </button>
            <button
              onClick={() => { onTabChange?.('messaging'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
            >
              Messagerie ({unreadMessagesCount})
            </button>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-3">Atlas G-market</h3>
            <p className="text-sm text-slate-400">
              La plateforme universelle de mise en relation de l'offre et de la demande.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Catégories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Produits & Biens</a></li>
              <li><a href="#" className="hover:text-white">Emplois & Offres</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Légal & Sécurité</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white">Conditions Générales d'Utilisation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">G-Tech HQ</h4>
            <p className="text-sm text-slate-400">Conçu et développé par l'équipe produit G-Tech.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};