import React, { useState } from 'react';

export interface CatalogItem {
  id: string;
  type: 'product' | 'service' | 'job' | 'vehicle' | 'real_estate';
  title: string;
  category: string;
  price: string;
  location: string;
  imageUrl: string;
  sellerName: string;
  sellerRating: number;
  sellerReviewsCount: number;
  trustBadges: {
    verifiedIdentity?: boolean;
    proSeller?: boolean;
    atlasGuarantee?: boolean;
    fastResponder?: boolean;
  };
  phoneAvailable: boolean;
  phoneNumber?: string;
  publishedAt: string;
  condition?: string;
}

const MOCK_ITEMS: CatalogItem[] = [
  {
    id: '1',
    type: 'product',
    title: 'MacBook Pro 16" M2 Max - 32 Go RAM - État neuf',
    category: 'Informatique & Tech',
    price: '2 350 €',
    location: 'Paris (75011)',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Tech Reconditioning Store',
    sellerRating: 4.9,
    sellerReviewsCount: 128,
    trustBadges: { verifiedIdentity: true, proSeller: true, atlasGuarantee: true, fastResponder: true },
    phoneAvailable: true,
    phoneNumber: '01 42 00 11 22',
    publishedAt: 'Il y a 2 heures',
    condition: 'Comme neuf'
  },
  {
    id: '2',
    type: 'service',
    title: 'Développement d’applications mobiles iOS & Android',
    category: 'Services Informatiques',
    price: '450 € / jour',
    location: 'Lyon & A distance',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Studio HexaCode',
    sellerRating: 5.0,
    sellerReviewsCount: 42,
    trustBadges: { verifiedIdentity: true, proSeller: true, fastResponder: true },
    phoneAvailable: true,
    phoneNumber: '06 12 34 56 78',
    publishedAt: 'Il y a 5 heures'
  },
  {
    id: '3',
    type: 'job',
    title: 'Chef de Projet Digital Senior (H/F) - CDI',
    category: 'Emploi & Recrutement',
    price: '55k - 65k € / an',
    location: 'Nantes (44000)',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    sellerName: 'InnoTech Solutions',
    sellerRating: 4.8,
    sellerReviewsCount: 19,
    trustBadges: { verifiedIdentity: true, proSeller: true },
    phoneAvailable: false,
    publishedAt: 'Aujourd’hui'
  },
  {
    id: '4',
    type: 'vehicle',
    title: 'Tesla Model 3 Long Range AWD - Autopilot',
    category: 'Véhicules',
    price: '31 900 €',
    location: 'Bordeaux (33000)',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80',
    sellerName: 'Alexandre M.',
    sellerRating: 4.7,
    sellerReviewsCount: 15,
    trustBadges: { verifiedIdentity: true, atlasGuarantee: true },
    phoneAvailable: true,
    phoneNumber: '06 98 76 54 32',
    publishedAt: 'Hier',
    condition: 'Très bon état'
  }
];

export const CatalogMockupView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [contactModalItem, setContactModalItem] = useState<CatalogItem | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? MOCK_ITEMS
    : MOCK_ITEMS.filter(i => i.type === selectedCategory);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '24px' }}>
      {/* En-tête de présentation */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 24px auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
          Catalogue Universel Atlas G-Market
        </h1>
        <p style={{ color: '#475569', fontSize: '15px' }}>
          Achetez, louez, embauchez ou trouvez des services en toute sécurité avec nos garanties et badges de confiance.
        </p>
      </div>

      {/* Barre d'action et filtres rapides */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 32px auto', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { id: 'all', label: 'Toutes les annonces' },
          { id: 'product', label: '🛍️ Produits' },
          { id: 'service', label: '🛠️ Services' },
          { id: 'job', label: '💼 Emplois' },
          { id: 'vehicle', label: '🚗 Véhicules' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '10px 18px',
              borderRadius: '24px',
              border: selectedCategory === cat.id ? '2px solid #2563EB' : '1px solid #CBD5E1',
              backgroundColor: selectedCategory === cat.id ? '#EFF6FF' : '#FFFFFF',
              color: selectedCategory === cat.id ? '#1D4ED8' : '#334155',
              fontWeight: selectedCategory === cat.id ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grille de cartes */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {filteredItems.map(item => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            <div>
              {/* Image & Badge Garantie */}
              <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: '#E2E8F0' }}>
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {item.trustBadges.atlasGuarantee && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#059669',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                  }}>
                    🛡️ Garantie Atlas
                  </span>
                )}
                {item.condition && (
                  <span style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#FFFFFF',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px'
                  }}>
                    {item.condition}
                  </span>
                )}
              </div>

              {/* Contenu principal */}
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {item.category} • {item.location}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#2563EB', marginBottom: '12px' }}>
                  {item.price}
                </div>

                {/* Badges de confiance du vendeur */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {item.trustBadges.verifiedIdentity && (
                    <span style={{ backgroundColor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
                      ✓ Identité vérifiée
                    </span>
                  )}
                  {item.trustBadges.proSeller && (
                    <span style={{ backgroundColor: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
                      ★ Compte Pro
                    </span>
                  )}
                  {item.trustBadges.fastResponder && (
                    <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
                      ⚡ Répond très vite
                    </span>
                  )}
                </div>

                {/* Vendeur / Évaluation */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                    {item.sellerName}
                  </div>
                  <div style={{ fontSize: '12px', color: '#D97706', fontWeight: '700' }}>
                    ★ {item.sellerRating} <span style={{ color: '#94A3B8', fontWeight: '400' }}>({item.sellerReviewsCount})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons d'action directe */}
            <div style={{ padding: '0 16px 16px 16px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setContactModalItem(item)}
                style={{
                  flex: 1,
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                💬 Message
              </button>
              {item.phoneAvailable && (
                <button
                  onClick={() => alert(`Numéro de contact direct : ${item.phoneNumber}`)}
                  style={{
                    backgroundColor: '#F1F5F9',
                    color: '#0F172A',
                    border: '1px solid #CBD5E1',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                  title="Appeler directement"
                >
                  📞
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'exemple pour prise de contact */}
      {contactModalItem && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          padding: '16px',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>
              Contacter {contactModalItem.sellerName}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
              Annonce concernée : <strong>{contactModalItem.title}</strong>
            </p>

            <textarea
              rows={4}
              placeholder="Bonjour, votre annonce m'intéresse. Est-elle toujours disponible ?"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '14px',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            />

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setContactModalItem(null)}
                style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  alert('Message envoyé avec succès !');
                  setContactModalItem(null);
                }}
                style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#2563EB', color: '#FFFFFF', fontWeight: '600', cursor: 'pointer' }}
              >
                Envoyer le message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogMockupView;