import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 text-sm mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400">
            G
          </div>
          <div>
            <p className="font-semibold text-slate-200 flex items-center gap-2">
              Atlas G-market
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Produit G-Tech
              </span>
            </p>
            <p className="text-xs text-slate-500">Plateforme universelle de mise en relation de l'offre et de la demande.</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs">
          <a href="/legal/terms" className="hover:text-emerald-400 transition-colors">Conditions Générales</a>
          <a href="/legal/privacy" className="hover:text-emerald-400 transition-colors">Confidentialité</a>
          <a href="/legal/compliance" className="hover:text-emerald-400 transition-colors">Conformité Légale</a>
        </div>

        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} G-Tech. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};