import React from 'react';

export interface GTechFooterProps {
  projectName?: string;
  projectUrl?: string;
  showLegalLinks?: boolean;
}

export const GTechFooter: React.FC<GTechFooterProps> = ({
  projectName = "Atlas G-market",
  projectUrl = "https://atlas-g-market.vercel.app",
  showLegalLinks = true,
}) => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider text-slate-100 uppercase text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded">
            G-Tech HQ
          </span>
          <a href={projectUrl} className="font-medium text-slate-200 hover:text-white transition-colors">
            {projectName}
          </a>
        </div>

        {showLegalLinks && (
          <nav className="flex items-center gap-4 text-xs text-slate-400">
            <a href="/terms" className="hover:text-slate-200 transition-colors">CGU / CGV</a>
            <span>•</span>
            <a href="/privacy" className="hover:text-slate-200 transition-colors">Confidentialité</a>
            <span>•</span>
            <a href="/compliance" className="hover:text-slate-200 transition-colors">Conformité</a>
          </nav>
        )}

        <div className="text-xs text-slate-500">
          © {year} — <span className="text-slate-300 font-medium">Powered by G-Tech</span>
        </div>
      </div>
    </footer>
  );
};

export default GTechFooter;