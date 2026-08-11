import React from 'react';
import logo from '../assets/gtech-logo.png';

const AtlasLayout = () => {
  return (
    <div>
      <header>
        <img src={logo} alt="G-Tech Logo" />
        <h1>Atlas G-Market</h1>
      </header>
      <main>
        {/* Contenu de la page */}
      </main>
      <footer>
        <p>Produit G-Tech</p>
        <img src={logo} alt="G-Tech Logo" />
      </footer>
    </div>
  );
};

export default AtlasLayout;