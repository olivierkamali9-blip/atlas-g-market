import React from 'react';
import { Grid, Container } from '@material-ui/core';
import AtlasHeader from './AtlasHeader';
import AtlasFooter from './AtlasFooter';

const AtlasLayout = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AtlasHeader />
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item xs={12}>
          <AtlasFooter />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AtlasLayout;