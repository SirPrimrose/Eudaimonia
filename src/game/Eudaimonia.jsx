import {
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KEY_P } from 'keycode-js';
import GameSection from './layout/GameSection';
import TextPanel from './layout/TextPanel';
import gameLoopThunk from '../slice/gameLoopThunk';
import {
  actions as gameActions,
  getGameTime,
  isGameTicking,
} from '../slice/gameSlice';
import { GAME_TICK_TIME } from '../shared/consts';
import PlayerSection from './layout/PlayerSection';
import InfoSection from './layout/InfoSection';
import ProgressBarWithOverlay from '../shared/ProgressBarWithOverlay';
import { getProgressValue } from '../shared/util';
import { getActiveStats } from '../slice/statsSlice';

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

  // TODO: Convert game time to clock format hh:mm:ss or mm:ss
  renderHeader = (gameTime) => (
    <Typography align="center">{Math.floor(gameTime)}ms</Typography>
  );

  renderActiveStatusBars = (stats) => (
    <Stack>
      {stats.map((stat) => (
        <ProgressBarWithOverlay
          value={getProgressValue(stat.currentValue, stat.maxValue)}
          sx={{ minHeight: 20 }}
        >
          {`${stat.name} | (${+stat.currentValue.toFixed(
            2
          )}/${+stat.maxValue.toFixed(2)}) | ${+stat.currentDecayRate.toFixed(
            2
          )} ${stat.shortName}/s`}
        </ProgressBarWithOverlay>
      ))}
    </Stack>
  );

  render() {
    const { gameTime, activeStats } = this.props;

    return (
      <Stack className="eudaimonia">
        {this.renderHeader(gameTime)}
        {this.renderActiveStatusBars(activeStats)}
        <Grid container sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <Grid item xs={3} md={2.5} lg={2} sx={{ height: '100%' }}>
            <PlayerSection />
          </Grid>
          <Grid item xs={6} md={7} lg={8} sx={{ height: '100%' }}>
            <GameSection />
          </Grid>
          <Grid item xs={3} md={2.5} lg={2} sx={{ height: '100%' }}>
            <InfoSection />
          </Grid>
        </Grid>
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
};

const mapStateToProps = (store) => ({
  gameTime: getGameTime(store),
  ticking: isGameTicking(store),
  activeStats: getActiveStats(store),
});

const mapDispatchToProps = {
  togglePaused: gameActions.togglePaused,
  runGameLoop: gameLoopThunk.runGameLoop,
};

export default connect(mapStateToProps, mapDispatchToProps)(Eudaimonia);
