import React, { ReactNode } from 'react';
import { modernSlateEmeraldTheme } from '../styles/theme';

interface AtlasLayoutProps {
  children: ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const AtlasLayout: React.FC<AtlasLayoutProps> = ({ children, activeTab = 'explore', onTabChange }) => {
  const { colors, shadows } = modernSlateEmeraldTheme;

  return (
    <div 
      style={{ 
        backgroundColor: colors.slate[900], 
        color: colors.slate[100], 
        minHeight: '100vh',
        fontFamily: modernSlateEmeraldTheme.typography.fontFamily,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <header 
        style={{ 
          backgroundColor: colors.slate[800], 
          borderBottom: `1px solid ${colors.slate[700]}`,
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div 
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px', 
              backgroundColor: colors.emerald[600],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: '#ffffff',
              boxShadow: shadows.emeraldGlow
            }}
          >
            A
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em', color: colors.slate[50] }}>
            Atlas <span style={{ color: colors.emerald[400] }}>G-market</span>
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '1rem' }}>
          {[
            { id: 'explore', label: 'Explorer Tout' },
            { id: 'publish', label: 'Déposer une annonce' },
            { id: 'messages', label: 'Messagerie' }
          ].map((navItem) => {
            const isActive = activeTab === navItem.id;
            return (
              <button
                key={navItem.id}
                onClick={() => onTabChange && onTabChange(navItem.id)}
                style={{
                  backgroundColor: isActive ? colors.emerald[600] : 'transparent',
                  color: isActive ? '#ffffff' : colors.slate[300],
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? shadows.emeraldGlow : 'none'
                }}
              >
                {navItem.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1280px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {children}
      </main>

      {/* Footer */}
      <footer 
        style={{ 
          backgroundColor: colors.slate[800], 
          borderTop: `1px solid ${colors.slate[700]}`, 
          padding: '1.5rem 2rem',
          textAlign: 'center',
          color: colors.slate[600],
          fontSize: '0.875rem'
        }}
      >
        <p>© 2026 Atlas G-market par G-Tech HQ — Plateforme universelle de mise en relation (Produits, Emplois, Services)</p>
      </footer>
    </div>
  );
};