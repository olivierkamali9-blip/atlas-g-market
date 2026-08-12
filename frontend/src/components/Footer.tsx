import React from 'react';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '24px 16px', color: '#666', borderTop: '1px solid #eee', marginTop: 40 }}>
      © {new Date().getFullYear()} Atlas G-Market
    </footer>
  );
};

export default Footer;
