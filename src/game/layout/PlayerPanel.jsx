import { Grid } from '@mui/material';
import React from 'react';
import PlayerInventoryPanel from './PlayerInventoryPanel';
import TextPanel from './TextPanel';

class PlayerPanel extends React.PureComponent {
  render() {
    return (
      <Grid
        borderLeft={1}
        borderRight={1}
        sx={{ height: '100%' }}
        container
        direction="column"
      >
        <Grid
          borderBottom={1}
          item
          xs={4}
          sx={{ height: '100%', overflow: 'hidden' }}
        >
          <TextPanel />
        </Grid>
        <Grid
          borderBottom={1}
          item
          xs={8}
          sx={{ height: '100%', overflow: 'hidden' }}
        >
          <PlayerInventoryPanel />
        </Grid>
      </Grid>
    );
  }
}

export default PlayerPanel;
