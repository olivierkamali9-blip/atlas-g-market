import React from 'react';
import AtlasSearch from './components/AtlasSearch';
import AtlasPublishAd from './components/AtlasPublishAd';
import AtlasMessaging from './components/AtlasMessaging';

const Routes = () => {
  return (
    <div>
      <header className="atlas-header">
        <h1>Atlas G-Market</h1>
      </header>
      <main className="atlas-container">
        <div className="atlas-card">
          <h2>Rechercher une annonce</h2>
          <AtlasSearch />
        </div>
        <div className="atlas-card">
          <h2>Publier une annonce</h2>
          <AtlasPublishAd />
        </div>
        <div className="atlas-card">
          <h2>Messagerie</h2>
          <AtlasMessaging />
        </div>
      </main>
    </div>
  );
};

export default Routes;
