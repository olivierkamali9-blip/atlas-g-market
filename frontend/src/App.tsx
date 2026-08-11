import React, { useState } from 'react';
import './index.css';
import AtlasSearch from './components/AtlasSearch';
import AtlasPublishAd from './components/AtlasPublishAd';
import AtlasMessaging from './components/AtlasMessaging';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'publish' | 'messages'>('search');

  return (
    <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <header style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#10b981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>A</div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>Atlas G-Market</h1>
        </div>
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          {(['search', 'publish', 'messages'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? '#10b981' : 'transparent',
                color: activeTab === tab ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab === 'search' ? 'Rechercher' : tab === 'publish' ? 'Publier une annonce' : 'Messagerie'}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {activeTab === 'search' && <AtlasSearch />}
        {activeTab === 'publish' && <AtlasPublishAd />}
        {activeTab === 'messages' && <AtlasMessaging />}
      </main>
    </div>
  );
};

export default App;