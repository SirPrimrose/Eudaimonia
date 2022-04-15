import { Grid } from '@mui/material';
import React from 'react';

class InventoryPanel extends React.PureComponent {
  render() {
    return (
      <Grid sx={{ height: '100%' }} container direction="column">
        <Grid item xs={4}>
          <div>Action Queue</div>
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
