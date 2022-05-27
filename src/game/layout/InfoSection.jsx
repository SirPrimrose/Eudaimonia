import { Grid } from '@mui/material';
import React from 'react';
import ActionQueuePanel from './ActionQueuePanel';
import TextPanel from './TextPanel';

class InfoSection extends React.PureComponent {
  render() {
    return (
      <Grid sx={{ height: '100%' }} container direction="column">
        <Grid item xs={4} sx={{ overflow: 'hidden' }}>
          <ActionQueuePanel />
        </Grid>
        <Grid item xs={8} sx={{ overflow: 'hidden' }}>
          <TextPanel />
        </Grid>
      </Grid>
    );
  }
}

export default InfoSection;
