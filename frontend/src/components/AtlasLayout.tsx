import React from 'react';
import { Footer } from './Footer';

interface AtlasLayoutProps {
  children: React.ReactNode;
}

export const AtlasLayout: React.FC<AtlasLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <header className="bg-gray-900 border-b border-gray-800 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-extrabold text-white text-base shadow-lg shadow-blue-500/20">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight text-lg leading-tight">Atlas G-market</span>
            <span className="text-[10px] text-blue-400 font-medium -mt-0.5">Plateforme universelle d'échange</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs font-semibold bg-blue-950/60 text-blue-300 px-3 py-1 rounded-full border border-blue-800/50">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Produit G-Tech</span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default AtlasLayout;