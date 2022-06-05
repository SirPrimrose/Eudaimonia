import { Grid } from '@mui/material';
import React from 'react';
import PlayerSection from '../../PlayerSection';
import GameSection from '../../GameSection';
import InfoSection from '../../InfoSection';

class WanderPhase extends React.PureComponent {
  render() {
    return (
      <Grid
        container
        sx={{
          flexGrow: 1,
          overflow: { xs: 'auto', md: 'hidden' },
        }}
      >
        <Grid
          item
          xs={12}
          md={2.5}
          lg={2}
          sx={{ height: { xs: '40%', md: '100%' } }}
          p={2}
        >
          <PlayerSection />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={7}
          sx={{ height: { xs: '50%', md: '100%' } }}
          p={2}
        >
          <GameSection />
        </Grid>
        <Grid
          item
          xs={12}
          md={3.5}
          lg={3}
          sx={{ height: { xs: '50%', md: '100%' } }}
          p={2}
        >
          <InfoSection />
        </Grid>
      </Grid>
    );
  }
}

export default WanderPhase;
