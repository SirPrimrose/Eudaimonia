import { Grid } from '@mui/material';
import React from 'react';
import ActionQueuePanel from './ActionQueuePanel';
import PlayerInventoryPanel from './PlayerInventoryPanel';
import WorldInventoryPanel from './WorldInventoryPanel';

class InventoryPanel extends React.PureComponent {
  render() {
    return (
      <Grid sx={{ height: '100%' }} container direction="column">
        <Grid item xs={4} sx={{ overflow: 'hidden' }}>
          <ActionQueuePanel />
        </Grid>
        <Grid item xs={4} sx={{ overflow: 'hidden' }}>
          <PlayerInventoryPanel />
        </Grid>
        <Grid item xs={4} sx={{ overflow: 'hidden' }}>
          <WorldInventoryPanel />
        </Grid>
      </Grid>
    );
  }
}

export default InventoryPanel;
