import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KEY_P } from 'keycode-js';
import {
  actions as gameActions,
  isGameTicking,
  getGameException,
} from '../slice/gameSlice';
import { actions as themeActions } from '../slice/themeSlice';
import PhasePanel from './layout/PhasePanel';
import { GAME_TICK_TIME } from './consts';

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

  handleClose = () => {
    window.close();
  };

  showErrorDialog = () => {
    const { exception, resetGame } = this.props;

    return (
      <Dialog open onClose={this.handleClose}>
        <DialogTitle>Something happened!</DialogTitle>
        <DialogContent>
          <DialogContentText variant="subtitle2" sx={{ fontStyle: 'italic' }}>
            All I know is that it was not my fault. And that this is probably
            what caused it:
          </DialogContentText>
          <DialogContentText
            variant="h5"
            sx={{ fontWeight: 'bold' }}
          >{`${exception.message}`}</DialogContentText>
          <DialogContentText variant="body" sx={{ fontFamily: 'Monospace' }}>
            {`${exception.stack}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => resetGame()}>Hard Reset Game</Button>
          <Button onClick={this.handleClose}>Close Game</Button>
        </DialogActions>
      </Dialog>
    );
  };

  render() {
    const { exception, resetGame, toggleTheme } = this.props;

    return exception ? (
      <>{this.showErrorDialog()}</>
    ) : (
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
  exception: PropTypes.shape({
    message: PropTypes.string.isRequired,
    stack: PropTypes.string.isRequired,
  }),
  ticking: PropTypes.bool.isRequired,

  togglePaused: PropTypes.func.isRequired,
  runGameLoop: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

Eudaimonia.defaultProps = {
  exception: null,
};

const mapStateToProps = (store) => ({
  exception: getGameException(store),
  ticking: isGameTicking(store),
});

const mapDispatchToProps = {
  togglePaused: gameActions.togglePaused,
  runGameLoop: gameActions.runGameLoop,
  resetGame: gameActions.resetGame,
  toggleTheme: themeActions.toggleTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(Eudaimonia);
