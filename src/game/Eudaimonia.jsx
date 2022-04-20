import { Grid } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GamePanel from './layout/GamePanel';
import TextPanel from './layout/TextPanel';
import gameLoopThunk from '../slice/gameLoopThunk';
import { isGameTicking } from '../slice/gameSlice';

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
    const { ticking, runGameLoop } = this.props;
    if (!ticking) runGameLoop();
  };

  render() {
    return (
      <Grid className="eudaimonia" container>
        <Grid item xs={2} sx={{ height: '100%' }}>
          <TextPanel />
        </Grid>
        <Grid item xs={10}>
          <GamePanel />
        </Grid>
      </Grid>
    );
  }
}

Eudaimonia.propTypes = {
  ticking: PropTypes.bool.isRequired,
  runGameLoop: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  ticking: isGameTicking(store),
});

const mapDispatchToProps = {
  runGameLoop: gameLoopThunk.runGameLoop,
};

export default connect(mapStateToProps, mapDispatchToProps)(Eudaimonia);
