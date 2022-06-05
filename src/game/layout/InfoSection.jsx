import { Grid, Paper } from '@mui/material';
import React from 'react';
import ActionQueuePanel from './ActionQueuePanel';
import TextPanel from './TextPanel';

class InfoSection extends React.PureComponent {
  render() {
    return (
      <Paper elevation={8} sx={{ height: '100%' }}>
        <Grid
          sx={{ height: '100%' }}
          container
          direction={{ xs: 'row', md: 'column' }}
        >
          <Grid item xs={6} md={4} sx={{ overflow: 'hidden' }}>
            <ActionQueuePanel />
          </Grid>
          <Grid item xs={6} md={8} sx={{ overflow: 'hidden', height: '100%' }}>
            <TextPanel />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default InfoSection;
