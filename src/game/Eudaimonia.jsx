import { Grid } from '@mui/material';
import React from 'react';

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
      <Grid container spacing={8}>
        <Grid item xs={2}>
          <div>Text wall</div>
        </Grid>
        <Grid item xs={10}>
          <div>Game window</div>
        </Grid>
      </Grid>
    );
  }
}

export default Eudaimonia;
