import React from 'react';
import Header from './Header';
import Footer from './Footer';

const AtlasLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AtlasLayout;