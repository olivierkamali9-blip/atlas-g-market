import React, { useState } from 'react';

interface AtlasLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const AtlasLayout: React.FC<AtlasLayoutProps> = ({ children, activeTab = 'explore', onTabChange }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { id: 'explore', label: 'Tout explorer', icon: '🔍' },
    { id: 'publish', label: 'Publier une offre/demande', icon: '➕' },
    { id: 'messages', label: 'Messagerie', icon: '💬' },
    { id: 'account', label: 'Mon Compte', icon: '👤' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Navigation supérieure */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange?.('explore')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30">
              A
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight">Atlas <span className="text-emerald-500">G-Market</span></span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full emerald-badge font-medium">Offres & Demandes</span>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange?.(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions & Thème */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Changer de thème"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            >
              🍔
            </button>
          </div>
        </div>

        {/* Navigation Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange?.(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-3 ${
                  activeTab === item.id
                    ? 'bg-emerald-500 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Pied de page */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© 2026 Atlas G-Market par G-Tech HQ. Plateforme universelle d'échange et d'opportunités.</p>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:text-emerald-500 transition-colors">Confidentialité</a>
            <a href="#terms" className="hover:text-emerald-500 transition-colors">Conditions générales</a>
            <a href="#help" className="hover:text-emerald-500 transition-colors">Centre d'aide</a>
          </div>
        </div>
      </footer>
    </div>
  );
};