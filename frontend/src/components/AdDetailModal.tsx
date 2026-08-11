import React from 'react';
import { AdItem } from './AdCard';

interface AdDetailModalProps {
  ad: AdItem | null;
  onClose: () => void;
  onContactSeller: (ad: AdItem) => void;
}

export const AdDetailModal: React.FC<AdDetailModalProps> = ({ ad, onClose, onContactSeller }) => {
  if (!ad) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-800 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-200">
        
        {/* Header Modal */}
        <div className="relative h-64 bg-slate-900 flex items-center justify-center">
          {ad.imageUrl ? (
            <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-slate-500 font-medium">Aucune image disponible</div>
          )}

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white rounded-full transition-colors border border-slate-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {ad.category}
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-700 text-slate-300">
                  {ad.type === 'offre' ? 'Offre' : 'Demande'}
                </span>
                {ad.isAdultOnly && (
                  <span className="px-2.5 py-1 text-xs font-bold rounded bg-rose-600/30 text-rose-400 border border-rose-500/30">
                    Avertissement 18+
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">{ad.title}</h2>
            </div>

            <div className="text-right">
              <span className="text-2xl font-extrabold text-emerald-400">
                {typeof ad.price === 'number' ? `${ad.price.toLocaleString('fr-FR')} €` : ad.price}
              </span>
              <p className="text-xs text-slate-400 mt-1">Localisation : {ad.location}</p>
            </div>
          </div>

          <div className="border-t border-slate-700/60 pt-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              Annonce vérifiée et conforme à la charte Atlas G-market. Mettez-vous directement en relation avec l'auteur pour négocier, échanger ou convenir d'un rendez-vous.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-700/60 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700/50 transition-colors text-sm font-medium"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onContactSeller(ad);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20 transition-all text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contacter l'auteur
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};