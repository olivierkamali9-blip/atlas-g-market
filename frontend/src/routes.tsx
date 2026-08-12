import React from 'react';
import AtlasSearch from './components/AtlasSearch';
import AtlasPublishAd from './components/AtlasPublishAd';
import AtlasMessaging from './components/AtlasMessaging';

// Page principale : recherche, publication d'annonce, et messagerie réunies.
// Un vrai routeur (react-router) pourra être ajouté plus tard si le projet grandit.
const Routes = () => {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Atlas G-Market</h1>
      <section style={{ marginBottom: 32 }}>
        <h2>Rechercher une annonce</h2>
        <AtlasSearch />
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2>Publier une annonce</h2>
        <AtlasPublishAd />
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2>Messagerie</h2>
        <AtlasMessaging />
      </section>
    </main>
  );
};

export default Routes;
