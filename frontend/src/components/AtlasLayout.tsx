import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';

const AtlasLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="header">
        <h1>Atlas G-market</h1>
      </div>
      <div className="main">
        {children}
      </div>
      <div className="footer">
        <p>&copy; 2026 Atlas G-market</p>
      </div>
    </ThemeProvider>
  );
};

export default AtlasLayout;