import { Grid } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KEY_P } from 'keycode-js';
import GamePanel from './layout/GamePanel';
import TextPanel from './layout/TextPanel';
import gameLoopThunk from '../slice/gameLoopThunk';
import { actions as gameActions, isGameTicking } from '../slice/gameSlice';

const gameTicksPerSecond = 60;
const pauseKey = KEY_P;

class Eudaimonia extends React.PureComponent {
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.gameTick(),
      1000 / gameTicksPerSecond
    );
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  gameTick = () => {
    const { ticking, runGameLoop } = this.props;
    if (!ticking) runGameLoop();
  };

  handleKeyDown = (event) => {
    if (event.keyCode === pauseKey) {
      const { togglePaused } = this.props;

      togglePaused();
    }
  };

  render() {
    return (
      <Grid className="eudaimonia" container>
        <Grid item xs={2} sx={{ height: '100%' }}>
          <TextPanel />
        </Grid>
        <Grid item xs={10} sx={{ height: '100%' }}>
          <GamePanel />
        </Grid>
      </Grid>
    );
  }
}

Eudaimonia.propTypes = {
  ticking: PropTypes.bool.isRequired,
  togglePaused: PropTypes.func.isRequired,
  runGameLoop: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  ticking: isGameTicking(store),
});

const mapDispatchToProps = {
  togglePaused: gameActions.togglePaused,
  runGameLoop: gameLoopThunk.runGameLoop,
};

export default connect(mapStateToProps, mapDispatchToProps)(Eudaimonia);
