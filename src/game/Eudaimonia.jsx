import { Grid } from '@mui/material';
import React from 'react';
import GamePanel from './layout/GamePanel';
import TextPanel from './layout/TextPanel';

const gameTicksPerSecond = 60;

class Eudaimonia extends React.PureComponent {
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.gameTick(),
      1000 / gameTicksPerSecond
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  gameTick = () => {
    console.log('Tick');
  };

  render() {
    return (
      <Grid sx={{ height: '100%' }} container spacing={4}>
        <Grid item xs={2}>
          <TextPanel />
        </Grid>
        <Grid item xs={10}>
          <GamePanel />
        </Grid>
      </Grid>
    );
  }
}

export default Eudaimonia;
