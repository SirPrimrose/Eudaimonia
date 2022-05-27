import { Grid } from '@mui/material';
import React from 'react';
import PlayerInventoryPanel from './PlayerInventoryPanel';
import SkillPanel from './SkillPanel';

class PlayerSection extends React.PureComponent {
  render() {
    return (
      <Grid sx={{ height: '100%' }} container direction="column">
        <Grid item xs={4} sx={{ height: '100%', overflow: 'hidden' }}>
          <SkillPanel />
        </Grid>
        <Grid item xs={8} sx={{ height: '100%', overflow: 'hidden' }}>
          <PlayerInventoryPanel />
        </Grid>
      </Grid>
    );
  }
}

export default PlayerSection;
