import React from 'react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-900 text-gray-300 py-6 px-4 border-t border-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            G
          </div>
          <span className="font-semibold text-white tracking-wide text-sm">G-Tech HQ</span>
        </div>
        
        <p className="text-xs text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()} Atlas G-market. Tous droits réservés.
        </p>

        <div className="flex items-center space-x-2 text-xs font-medium bg-gray-800/80 px-3 py-1.5 rounded-full border border-gray-700/60">
          <span className="text-gray-400">Powered by</span>
          <span className="text-blue-400 font-bold tracking-wider uppercase text-[11px]">G-Tech</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;