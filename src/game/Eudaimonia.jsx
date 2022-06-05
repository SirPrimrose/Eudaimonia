import { Button, Stack, Typography } from '@mui/material';
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
import ProgressBarWithOverlay from '../shared/ProgressBarWithOverlay';
import { getProgressValue } from '../shared/util';
import { getIconForStatType } from './layout/components/Icons';
import { toClockTime, toGameNumber } from '../shared/format';
import { actions as themeActions } from '../slice/themeSlice';
import PhasePanel from './layout/PhasePanel';
import ParticlesWrapper from '../particles/ParticlesWrapper';

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

  renderHeader = (gameTime) => (
    <Typography align="center">{toClockTime(gameTime)}</Typography>
  );

  renderActiveStatusBars = (stats) => (
    <Stack borderBottom={1}>
      {stats.map((stat) => (
        <ProgressBarWithOverlay
          key={stat.name}
          value={getProgressValue(stat.currentValue, stat.maxValue)}
        >
          <Stack
            borderTop={1}
            justifyContent="center"
            direction="row"
            spacing={4}
          >
            <Typography color="primary.contrastText">
              {`${toGameNumber(stat.currentValue)}/${toGameNumber(
                stat.maxValue
              )} `}
              {getIconForStatType(stat.name)}
            </Typography>
            <Typography color="primary.contrastText">
              {`${toGameNumber(stat.currentDecayRate)} ${stat.shortName}/s`}
            </Typography>
          </Stack>
        </ProgressBarWithOverlay>
      ))}
    </Stack>
  );

  render() {
    const { gameTime, activeStats, resetGame, toggleTheme } = this.props;

    return (
      <Stack className="eudaimonia">
        <Stack direction="row" justifyContent="center">
          <Button onClick={() => resetGame()}>Hard Reset</Button>
          <Button onClick={() => toggleTheme()}>Toggle Theme</Button>
        </Stack>
        {this.renderHeader(gameTime)}
        {this.renderActiveStatusBars(activeStats)}
        <PhasePanel />
      </Stack>
    );
  }
}

Eudaimonia.propTypes = {
  gameTime: PropTypes.number.isRequired,
  ticking: PropTypes.bool.isRequired,
  activeStats: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      shortName: PropTypes.string.isRequired,
      currentDecayRate: PropTypes.number.isRequired,
      currentValue: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      maxValue: PropTypes.number.isRequired,
    })
  ).isRequired,

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
