import React, { useState } from 'react';

export interface AdItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  type: 'produit' | 'emploi' | 'service';
  condition: 'neuf' | 'occasion' | 'non_applicable';
  sellerName: string;
  sellerId: string;
  createdAt: string;
}

interface AdDetailModalProps {
  ad: AdItem | null;
  onClose: () => void;
  onStartConversation: (adId: string, sellerId: string) => void;
}

export const AdDetailModal: React.FC<AdDetailModalProps> = ({ ad, onClose, onStartConversation }) => {
  const [loading, setLoading] = useState(false);

  if (!ad) return null;

  const handleContactSeller = async () => {
    setLoading(true);
    try {
      await onStartConversation(ad.id, ad.sellerId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
          aria-label="Fermer"
        >
          ✕
        </button>

        <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold uppercase mb-3">
          {ad.type} - {ad.condition}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{ad.title}</h2>
        <p className="text-3xl font-extrabold text-amber-600 mb-4">
          {ad.price > 0 ? `${ad.price.toLocaleString('fr-FR')} €` : 'Gratuit / Sur devis'}
        </p>

        <p className="text-gray-700 text-sm leading-relaxed mb-6 whitespace-pre-line">
          {ad.description}
        </p>

        <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between items-center text-xs text-gray-500">
          <div>
            Proposé par : <span className="font-semibold text-gray-800">{ad.sellerName || 'Vendeur Atlas'}</span>
          </div>
          <div>Catégorie : <span className="font-semibold text-gray-800">{ad.category}</span></div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleContactSeller}
            disabled={loading}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? 'Connexion...' : '💬 Contacter le vendeur'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdDetailModal;