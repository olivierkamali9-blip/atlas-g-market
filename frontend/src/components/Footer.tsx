import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 px-4 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Identité G-Tech */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
            GT
          </div>
          <div>
            <span className="font-semibold text-white tracking-wide">G-Tech HQ</span>
            <p className="text-xs text-slate-400">Powered by G-Tech</p>
          </div>
        </div>

        {/* Liens utiles & légaux */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <a href="/terms" className="hover:text-white transition-colors">Conditions Générales</a>
          <a href="/privacy" className="hover:text-white transition-colors">Confidentialité</a>
          <a href="/legal" className="hover:text-white transition-colors">Mentions Légales</a>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500 text-center md:text-right">
          © {new Date().getFullYear()} Atlas G-market. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;