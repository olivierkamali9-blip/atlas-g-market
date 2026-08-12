import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#0F172A',
      color: '#94A3B8',
      padding: '2rem 1rem',
      borderTop: '1px solid #1E293B',
      marginTop: 'auto',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
          }}>
            G
          </div>
          <span style={{ color: '#F8FAFC', fontWeight: '700', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
            G-Tech HQ
          </span>
        </div>

        <p style={{ margin: 0, fontSize: '0.9rem', color: '#CBD5E1' }}>
          Atlas G-market — La plateforme universelle de mise en relation (offres, demandes, produits, services & emplois).
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          color: '#64748B',
          marginTop: '0.5rem'
        }}>
          <span>Powered by</span>
          <strong style={{ color: '#38BDF8' }}>G-Tech</strong>
          <span>• Tous droits réservés © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};