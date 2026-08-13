import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { SidebarCategories } from './SidebarCategories';
import { MixedCatalog, CatalogItem } from './MixedCatalog';

export const AtlasLayout: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [contactModalItem, setContactModalItem] = useState<{
    item: CatalogItem;
    mode: 'chat' | 'call';
  } | null>(null);

  const handleContactClick = (item: CatalogItem, mode: 'chat' | 'call') => {
    setContactModalItem({ item, mode });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <Header />

      {/* Hero Banner / Quick Info */}
      <section className="bg-emerald-800 text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              Atlas G-market — La place de marché universelle
            </h1>
            <p className="text-emerald-100 text-xs md:text-sm mt-1">
              Achetez, vendez, proposez ou cherchez tout : produits neufs/occasion, emplois, services, immobilier.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs md:text-sm px-4 py-2 rounded-lg shadow transition-colors">
              + Publier une annonce / besoin
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area: Sidebar Alibaba/Jumia style + Catalog Feed */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Menu latéral Pro */}
          <SidebarCategories
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Flux mixte Offres / Demandes */}
          <MixedCatalog
            selectedCategory={selectedCategory}
            onContactClick={handleContactClick}
          />
        </div>
      </main>

      {/* Contact Modal Simple Preview */}
      {contactModalItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setContactModalItem(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ✕
            </button>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              {contactModalItem.mode === 'chat' ? 'Message direct' : 'Contact téléphonique'}
            </h3>
            <div className="bg-emerald-50 p-3 rounded-md mb-4 text-xs text-emerald-800 border border-emerald-200">
              <span className="font-semibold">{contactModalItem.item.title}</span>
              <p className="text-emerald-600 font-bold mt-1">{contactModalItem.item.price}</p>
            </div>

            {contactModalItem.mode === 'chat' ? (
              <div className="space-y-3">
                <textarea
                  rows={3}
                  placeholder="Bonjour, je suis intéressé par votre annonce. Est-ce toujours disponible ?"
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                ></textarea>
                <button
                  onClick={() => {
                    alert('Message envoyé au vendeur !');
                    setContactModalItem(null);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-md"
                >
                  Envoyer le message
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-center">
                <p className="text-xs text-gray-600">Numéro direct du contact :</p>
                <div className="text-base font-mono font-bold text-emerald-700 bg-gray-100 p-2 rounded">
                  {contactModalItem.item.phone}
                </div>
                <a
                  href={`https://wa.me/${contactModalItem.item.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2.5 rounded-md flex items-center justify-center gap-2"
                >
                  Ouvrir sur WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AtlasLayout;