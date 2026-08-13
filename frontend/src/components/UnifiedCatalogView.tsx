import React, { useState } from 'react';
import { Search, Filter, Grid, List, Tag, MapPin, Sparkles, Briefcase, Car, Home, Smartphone, Wrench } from 'lucide-react';

export interface CatalogItem {
  id: string;
  title: string;
  category: string;
  type: 'OFFER' | 'DEMAND';
  condition?: 'NEW' | 'USED' | 'N/A';
  price: number | string;
  location: string;
  imageUrl?: string;
  date: string;
  badge?: string;
}

const SAMPLE_ITEMS: CatalogItem[] = [
  {
    id: '1',
    title: 'Développeur Fullstack Senior React/Node',
    category: 'Emploi & Services',
    type: 'OFFER',
    price: '450 € / jour',
    location: 'Paris & Télétravail',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
    date: 'Aujourd\'hui',
    badge: 'Pro'
  },
  {
    id: '2',
    title: 'Recherche appartement 3 pièces avec balcon',
    category: 'Immobilier',
    type: 'DEMAND',
    price: 'Max 1 200 € / mois',
    location: 'Lyon (69)',
    date: 'Hier',
    badge: 'Urgent'
  },
  {
    id: '3',
    title: 'Vélo de course en carbone - Bon état',
    category: 'Sport & Loisirs',
    type: 'OFFER',
    condition: 'USED',
    price: 850,
    location: 'Bordeaux',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
    date: 'Il y a 2 jours'
  },
  {
    id: '4',
    title: 'iPhone 15 Pro Max 256Go - Neuf sous scellé',
    category: 'Électronique',
    type: 'OFFER',
    condition: 'NEW',
    price: 1190,
    location: 'Nantes',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    date: 'Aujourd\'hui',
    badge: 'Garanti 2 ans'
  }
];

export const UnifiedCatalogView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | 'OFFER' | 'DEMAND'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { name: 'Toutes', icon: Sparkles },
    { name: 'Emploi & Services', icon: Briefcase },
    { name: 'Véhicules', icon: Car },
    { name: 'Immobilier', icon: Home },
    { name: 'Électronique', icon: Smartphone },
    { name: 'Bricolage & Dépannage', icon: Wrench },
  ];

  const filteredItems = SAMPLE_ITEMS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'Toutes' || item.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Barre de recherche principale */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '16px',
        padding: '32px 24px',
        color: '#ffffff',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.25)',
        marginBottom: '28px'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
          Catalogue Unifié Atlas G-market
        </h1>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '24px', fontSize: '15px' }}>
          Explorez et déposez absolument tout : biens, services, emplois, offres et demandes.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={20} />
            <input
              type="text"
              placeholder="Que cherchez-vous ? (ex: Vélo, Déménagement, iPhone...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 44px',
                borderRadius: '10px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#fff',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px', background: '#0f172a', padding: '4px', borderRadius: '10px', border: '1px solid #334155' }}>
            <button
              onClick={() => setSelectedType('ALL')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: selectedType === 'ALL' ? '#3b82f6' : 'transparent',
                color: selectedType === 'ALL' ? '#fff' : '#94a3b8',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Tout
            </button>
            <button
              onClick={() => setSelectedType('OFFER')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: selectedType === 'OFFER' ? '#10b981' : 'transparent',
                color: selectedType === 'OFFER' ? '#fff' : '#94a3b8',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Offres
            </button>
            <button
              onClick={() => setSelectedType('DEMAND')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: selectedType === 'DEMAND' ? '#f59e0b' : 'transparent',
                color: selectedType === 'DEMAND' ? '#fff' : '#94a3b8',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Demandes
            </button>
          </div>
        </div>
      </div>

      {/* Catégories rapides */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '20px',
                border: isActive ? '1px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: isActive ? '#eff6ff' : '#ffffff',
                color: isActive ? '#2563eb' : '#475569',
                fontWeight: isActive ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={16} />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Barre d'affichage (Vue grille / liste & résultats) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
          <strong>{filteredItems.length}</strong> annonce(s) trouvée(s)
        </p>

        <div style={{ display: 'flex', gap: '8px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '2px', backgroundColor: '#fff' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              padding: '6px 10px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: viewMode === 'grid' ? '#f1f5f9' : 'transparent',
              color: viewMode === 'grid' ? '#0f172a' : '#94a3b8',
              cursor: 'pointer'
            }}
            title="Vue grille"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={{
              padding: '6px 10px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: viewMode === 'list' ? '#f1f5f9' : 'transparent',
              color: viewMode === 'list' ? '#0f172a' : '#94a3b8',
              cursor: 'pointer'
            }}
            title="Vue liste"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Grille ou Liste des annonces */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
        gap: '20px'
      }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: viewMode === 'list' ? 'row' : 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div style={{
              height: viewMode === 'list' ? '160px' : '180px',
              width: viewMode === 'list' ? '220px' : '100%',
              backgroundColor: '#f8fafc',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ color: '#cbd5e1', textAlign: 'center' }}>
                  <Tag size={32} />
                  <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>Sans image</p>
                </div>
              )}

              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#ffffff',
                backgroundColor: item.type === 'OFFER' ? '#10b981' : '#f59e0b'
              }}>
                {item.type === 'OFFER' ? 'Offre' : 'Demande'}
              </span>

              {item.badge && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#1e293b',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {item.badge}
                </span>
              )}
            </div>

            <div style={{ padding: '16px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px', fontWeight: '500' }}>
                  {item.category} {item.condition ? `• ${item.condition === 'NEW' ? 'Neuf' : 'Occasion'}` : ''}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                  {item.title}
                </h3>
              </div>

              <div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#2563eb', marginBottom: '10px' }}>
                  {typeof item.price === 'number' ? `${item.price.toLocaleString()} €` : item.price}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', fontSize: '13px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> {item.location}
                  </span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnifiedCatalogView;