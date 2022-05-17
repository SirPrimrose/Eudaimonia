import { Grid } from '@mui/material';
import React from 'react';
import ActionQueuePanel from './ActionQueuePanel';
import PlayerInventoryPanel from './PlayerInventoryPanel';
import WorldResourcePanel from './WorldResourcePanel';

class InventoryPanel extends React.PureComponent {
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
        <Grid borderBottom={1} item xs={4} sx={{ overflow: 'hidden' }}>
          <PlayerInventoryPanel />
        </Grid>
        <Grid item xs={4} sx={{ overflow: 'hidden' }}>
          <WorldResourcePanel />
        </Grid>
      </Grid>
    );
  }
}

export default InventoryPanel;
