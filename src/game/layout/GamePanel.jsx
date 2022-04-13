import { Grid } from '@mui/material';
import React from 'react';
import phases from '../consts';
import InventoryPanel from './InventoryPanel';
import PhasePanel from './PhasePanel';

class GamePanel extends React.PureComponent {
  render() {
    return (
      <Grid sx={{ height: '100%' }} container spacing={4}>
        <Grid item xs={8}>
          <PhasePanel phase={phases.Preparation} />
        </Grid>
        <Grid item xs={4}>
          <InventoryPanel />
        </Grid>
      </Grid>
    );
  }
}

export default GamePanel;
