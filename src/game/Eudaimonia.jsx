import { Button, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KEY_P } from 'keycode-js';
import {
  actions as gameActions,
  getGameTime,
  isGameTicking,
  getActiveStats,
} from '../slice/gameSlice';
import { GAME_TICK_TIME } from '../shared/consts';
import { actions as themeActions } from '../slice/themeSlice';
import PhasePanel from './layout/PhasePanel';

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
    const { resetGame, toggleTheme } = this.props;

    return (
      <Stack className="eudaimonia">
        <Stack direction="row" justifyContent="center">
          <Button onClick={() => resetGame()}>Hard Reset</Button>
          <Button onClick={() => toggleTheme()}>Toggle Theme</Button>
        </Stack>
        <PhasePanel />
      </Stack>
    );
  }
}

Eudaimonia.propTypes = {
  ticking: PropTypes.bool.isRequired,

  togglePaused: PropTypes.func.isRequired,
  runGameLoop: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  gameTime: getGameTime(store),
  ticking: isGameTicking(store),
  activeStats: getActiveStats(store),
});

const mapDispatchToProps = {
  togglePaused: gameActions.togglePaused,
  runGameLoop: gameActions.runGameLoop,
  resetGame: gameActions.resetGame,
  toggleTheme: themeActions.toggleTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(Eudaimonia);
