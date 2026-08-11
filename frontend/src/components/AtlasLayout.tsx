import React from 'react';

interface AtlasLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AtlasLayout: React.FC<AtlasLayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#10b981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#ffffff' }}>
            A
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>Atlas G-market</h1>
        </div>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          {[
            { id: 'search', label: 'Rechercher' },
            { id: 'publish', label: 'Déposer une annonce' },
            { id: 'messaging', label: 'Messagerie' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                backgroundColor: activeTab === item.id ? '#10b981' : 'transparent',
                color: activeTab === item.id ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        {children}
      </main>
      <footer style={{ backgroundColor: '#1e293b', borderTop: '1px solid #334155', padding: '1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
        © 2026 Atlas G-market — Tous droits réservés
      </footer>
    </div>
  );
};