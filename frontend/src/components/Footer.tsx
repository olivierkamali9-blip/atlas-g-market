import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identité de la plateforme */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
              G
            </div>
            <span className="font-semibold text-lg text-white tracking-wide">
              Atlas G-market
            </span>
          </div>
          <p className="text-xs text-slate-400">
            La plateforme universelle de mise en relation de l'offre et de la demande.
          </p>
        </div>

        {/* Label G-Tech & Liens rapides */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/60 text-xs text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Powered by <strong className="text-indigo-400 font-semibold">G-Tech</strong></span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Produit G-Tech</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <a href="#about" className="hover:text-indigo-400 transition-colors">À propos</a>
            <a href="#terms" className="hover:text-indigo-400 transition-colors">Conditions d'utilisation</a>
            <a href="#privacy" className="hover:text-indigo-400 transition-colors">Confidentialité</a>
            <a href="#help" className="hover:text-indigo-400 transition-colors">Centre d'aide</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 mt-6 pt-4 text-center text-xs text-slate-500">
        © 2026 Atlas G-market par G-Tech HQ. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;