import { Grid, LinearProgress, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KEY_P } from 'keycode-js';
import GamePanel from './layout/GamePanel';
import TextPanel from './layout/TextPanel';
import gameLoopThunk from '../slice/gameLoopThunk';
import { actions as gameActions, isGameTicking } from '../slice/gameSlice';
import { GAME_TICK_TIME } from '../shared/consts';
import PlayerPanel from './layout/PlayerPanel';
import InfoPanel from './layout/InfoPanel';

const pauseKey = KEY_P;

class Eudaimonia extends React.PureComponent {
  componentDidMount() {
    this.intervalID = setInterval(() => this.gameTick(), GAME_TICK_TIME);
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
    // TODO: Show active stat bars (HP, Wanderlust, etc.) above all three main panels
    return (
      <Stack className="eudaimonia">
        <LinearProgress
          variant="determinate"
          value={50}
          sx={{ minHeight: 20 }}
        />
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={3} md={2.5} lg={2} sx={{ height: '100%' }}>
            <PlayerPanel />
          </Grid>
          <Grid item xs={6} md={7} lg={8} sx={{ height: '100%' }}>
            <GamePanel />
          </Grid>
          <Grid item xs={3} md={2.5} lg={2} sx={{ height: '100%' }}>
            <InfoPanel />
          </Grid>
        </Grid>
      </Stack>
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
