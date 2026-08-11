import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
            G
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg leading-tight">Atlas G-market</h3>
            <p className="text-xs text-slate-400">Powered by G-Tech</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <a href="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</a>
          <a href="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</a>
          <a href="/compliance" className="hover:text-white transition-colors">Conformité & Légal</a>
          <a href="/contact" className="hover:text-white transition-colors">Contact & Support</a>
        </div>

        <div className="text-xs text-slate-500 text-center md:text-right">
          <p>© 2026 G-Tech HQ. Tous droits réservés.</p>
          <p className="mt-1 text-slate-400 font-medium">Plateforme globale d'échange & services</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;