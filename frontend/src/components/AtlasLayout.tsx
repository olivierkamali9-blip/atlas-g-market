import React from 'react';
import { Footer } from './Footer';

const AtlasLayout = ({ children }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default AtlasLayout;