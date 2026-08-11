import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';

const AtlasLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default AtlasLayout;