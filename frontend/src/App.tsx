import React, { useState } from 'react';
import { MixedCatalog } from './components/MixedCatalog';
import { AdItem } from './components/AdCard';
import { AtlasMessaging } from './components/AtlasMessaging';
import { AdDetailModal } from './components/AdDetailModal';
import { GTechFooter } from './components/GTechFooter';

export const App: React.FC = () => {
  const [activeMessagingAd, setActiveMessagingAd] = useState<AdItem | null>(null);
  const [selectedAdModal, setSelectedAdModal] = useState<AdItem | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-blue-600">ATLAS</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-semibold border border-slate-200">
              G-market Public
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline-block">🔓 Consultation & Contact Libres</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm">
              + Déposer une annonce
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <MixedCatalog
          onOpenMessaging={(ad) => setActiveMessagingAd(ad)}
          onSelectAd={(ad) => setSelectedAdModal(ad)}
        />
      </main>

      {activeMessagingAd && (
        <AtlasMessaging
          ad={activeMessagingAd}
          onClose={() => setActiveMessagingAd(null)}
        />
      )}

      {selectedAdModal && (
        <AdDetailModal
          ad={selectedAdModal}
          onClose={() => setSelectedAdModal(null)}
          onOpenMessaging={(ad) => {
            setSelectedAdModal(null);
            setActiveMessagingAd(ad);
          }}
        />
      )}

      <GTechFooter />
    </div>
  );
};

export default App;