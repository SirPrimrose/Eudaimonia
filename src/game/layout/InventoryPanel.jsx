import { Grid } from '@mui/material';
import React from 'react';
import ActionQueuePanel from './ActionQueuePanel';

class InventoryPanel extends React.PureComponent {
  render() {
    return (
      <Grid sx={{ height: '100%' }} container direction="column">
        <Grid item xs={4}>
          <ActionQueuePanel />
        </Grid>
        <Grid item xs={4}>
          <div>Local Inv</div>
        </Grid>
        <Grid item xs={4}>
          <div>Stored Inv</div>
        </Grid>
      </Grid>
    );
  }
}

export default InventoryPanel;
