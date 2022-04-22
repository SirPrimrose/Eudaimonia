import { Grid } from '@mui/material';
import React from 'react';
import InventoryPanel from './InventoryPanel';
import PhasePanel from './PhasePanel';

class GamePanel extends React.PureComponent {
  render() {
    return (
      <Grid sx={{ height: '100%' }} container>
        <Grid item xs={8} sx={{ height: '100%' }}>
          <PhasePanel />
        </Grid>
        <Grid item xs={4} sx={{ height: '100%' }}>
          <InventoryPanel />
        </Grid>
      </Grid>
    );
  }
}

export default GamePanel;
