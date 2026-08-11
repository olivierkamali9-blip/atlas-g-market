import React from 'react';

export interface AdItem {
  id: string;
  title: string;
  category: string;
  price: number | string;
  location: string;
  type: 'offre' | 'demande';
  condition?: 'neuf' | 'occasion' | 'saisonnier' | 'cdi' | 'cdd' | 'freelance';
  imageUrl?: string;
  createdAt: string;
  isAdultOnly?: boolean;
}

interface AdCardProps {
  ad: AdItem;
  onClick: (ad: AdItem) => void;
}

export const AdCard: React.FC<AdCardProps> = ({ ad, onClick }) => {
  return (
    <div 
      onClick={() => onClick(ad)}
      className="bg-slate-800/90 border border-slate-700/60 rounded-xl overflow-hidden hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/20 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* En-tête image / badge */}
        <div className="relative h-44 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
          {ad.imageUrl ? (
            <img 
              src={ad.imageUrl} 
              alt={ad.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          ) : (
            <div className="text-slate-600 font-medium text-sm flex flex-col items-center gap-1">
              <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Aucune image</span>
            </div>
          )}

          {/* Type Badge */}
          <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full shadow-md backdrop-blur-md ${
            ad.type === 'offre' 
              ? 'bg-emerald-500/90 text-slate-950' 
              : 'bg-indigo-500/90 text-white'
          }`}>
            {ad.type === 'offre' ? 'Offre' : 'Demande'}
          </span>

          {/* Age restriction badge */}
          {ad.isAdultOnly && (
            <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-bold rounded bg-rose-600/90 text-white border border-rose-400/30">
              18+
            </span>
          )}
        </div>

        {/* Contenu */}
        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-medium mb-1">
            <span className="uppercase tracking-wider">{ad.category}</span>
            {ad.condition && (
              <span className="capitalize text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded">
                {ad.condition}
              </span>
            )}
          </div>

          <h3 className="text-slate-100 font-semibold text-base line-clamp-1 group-hover:text-emerald-400 transition-colors">
            {ad.title}
          </h3>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-xl font-bold text-emerald-400">
              {typeof ad.price === 'number' ? `${ad.price.toLocaleString('fr-FR')} €` : ad.price}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {ad.location}
            </span>
          </div>
        </div>
      </div>

      {/* Pied de carte */}
      <div className="px-4 py-2.5 bg-slate-900/40 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-400">
        <span>Publié le {new Date(ad.createdAt).toLocaleDateString('fr-FR')}</span>
        <span className="text-emerald-400 font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          Voir l'annonce &rarr;
        </span>
      </div>
    </div>
  );
};