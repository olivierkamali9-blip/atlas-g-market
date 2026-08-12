import React from 'react';

export interface GTechFooterProps {
  appName?: string;
  year?: number;
  customLinks?: Array<{ label: string; href: string }>;
  theme?: 'dark' | 'light';
}

export const GTechFooter: React.FC<GTechFooterProps> = ({
  appName = 'Atlas G-market',
  year = new Date().getFullYear(),
  customLinks = [],
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  return (
    <footer
      aria-label="Pied de page G-Tech"
      style={{
        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        color: isDark ? '#94a3b8' : '#475569',
        borderTop: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
        padding: '24px 16px',
        fontSize: '14px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
          <span
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              letterSpacing: '0.5px',
            }}
          >
            G-TECH
          </span>
          <span style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>{appName}</span>
        </div>

        {customLinks.length > 0 && (
          <nav aria-label="Liens utiles" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {customLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  color: isDark ? '#cbd5e1' : '#334155',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div style={{ fontSize: '13px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>© {year} {appName}. Tous droits réservés.</span>
          <span>•</span>
          <span style={{ fontWeight: 500 }}>
            Powered by <strong style={{ color: '#2563eb' }}>G-Tech HQ</strong>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default GTechFooter;