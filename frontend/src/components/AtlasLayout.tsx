import React from 'react';
import { Footer } from './Footer';

interface AtlasLayoutProps {
  children: React.ReactNode;
}

export const AtlasLayout: React.FC<AtlasLayoutProps> = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#090D16',
      color: '#F8FAFC',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* En-tête supérieur */}
      <header style={{
        backgroundColor: '#0F172A',
        borderBottom: '1px solid #1E293B',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            boxShadow: '0 2px 10px rgba(37, 99, 235, 0.4)'
          }}>
            G
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#F8FAFC' }}>
              Atlas G-market
            </h1>
            <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: '500' }}>
              Produit G-Tech
            </span>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {children}
      </main>

      {/* Pied de page global */}
      <Footer />
    </div>
  );
};