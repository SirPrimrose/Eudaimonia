import { Grid, Paper } from '@mui/material';
import React from 'react';
import PlayerInventoryPanel from './PlayerInventoryPanel';
import SkillPanel from './SkillPanel';

class PlayerSection extends React.PureComponent {
  // TODO: Check overflow on xs size for panels, apply fix from InfoSection
  render() {
    return (
      <Paper elevation={8} sx={{ height: '100%' }}>
        <Grid
          sx={{ height: '100%' }}
          container
          direction={{ xs: 'row', md: 'column' }}
        >
          <Grid item xs={6} md={5} sx={{ height: '100%', overflow: 'hidden' }}>
            <SkillPanel />
          </Grid>
          <Grid item xs={6} md={7} sx={{ height: '100%', overflow: 'hidden' }}>
            <PlayerInventoryPanel />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default PlayerSection;
