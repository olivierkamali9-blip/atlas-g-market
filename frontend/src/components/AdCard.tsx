import React from 'react';

export interface AdItem {
  id: string;
  title: string;
  category: string;
  type: 'offre' | 'demande';
  condition?: 'neuf' | 'occasion' | 'service' | 'emploi';
  price: string;
  location: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  imageUrl?: string;
  createdAt: string;
}

interface AdCardProps {
  ad: AdItem;
  onOpenMessaging: (ad: AdItem) => void;
  onSelectAd: (ad: AdItem) => void;
}

export const AdCard: React.FC<AdCardProps> = ({ ad, onOpenMessaging, onSelectAd }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
          {ad.imageUrl ? (
            <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-slate-400 text-sm flex flex-col items-center">
              <span>📷 Aperçu disponible</span>
            </div>
          )}
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
            ad.type === 'offre' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {ad.type === 'offre' ? 'Offre' : 'Demande'}
          </span>
          <span className="absolute top-3 right-3 bg-slate-900/75 text-white px-2 py-0.5 rounded text-xs backdrop-blur-sm">
            {ad.category}
          </span>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-semibold text-slate-900 text-base line-clamp-1 hover:text-blue-600 cursor-pointer" onClick={() => onSelectAd(ad)}>
              {ad.title}
            </h3>
            <span className="font-bold text-blue-600 text-base whitespace-nowrap">{ad.price}</span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{ad.description}</p>

          <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
            <span>📍 {ad.location}</span>
            <span>🕒 {ad.createdAt}</span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 border-t border-slate-100 mt-auto bg-slate-50/50 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 text-xs pt-3">
          <button
            onClick={() => onOpenMessaging(ad)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors"
          >
            💬 Envoyer un message
          </button>
          <a
            href={`tel:${ad.contactPhone}`}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors text-center"
            title={`Appeler au ${ad.contactPhone}`}
          >
            📞 {ad.contactPhone}
          </a>
        </div>
      </div>
    </div>
  );
};