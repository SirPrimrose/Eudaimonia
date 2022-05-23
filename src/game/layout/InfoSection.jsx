import { Grid } from '@mui/material';
import React from 'react';
import ActionQueuePanel from './ActionQueuePanel';
import TextPanel from './TextPanel';

class InfoSection extends React.PureComponent {
  render() {
    return (
      <Grid
        borderLeft={1}
        borderRight={1}
        sx={{ height: '100%' }}
        container
        direction="column"
      >
        <Grid borderBottom={1} item xs={4} sx={{ overflow: 'hidden' }}>
          <ActionQueuePanel />
        </Grid>
        <Grid borderBottom={1} item xs={8} sx={{ overflow: 'hidden' }}>
          <TextPanel />
        </Grid>
      </Grid>
    );
  }
}

export default InfoSection;
