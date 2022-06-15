import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerSection from '../../PlayerSection';
import GameSection from '../../GameSection';
import InfoSection from '../../InfoSection';

import { getActiveStats, getGameTime } from '../../../../slice/gameSlice';
import ProgressBarWithOverlay from '../../../../shared/ProgressBarWithOverlay';
import { getIconForStatType } from '../../components/Icons';
import { getProgressValue } from '../../../../shared/util';
import { toClockTime, toGameNumber } from '../../../format';

class WanderPhase extends React.PureComponent {
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
              {`${toGameNumber(stat.currentDecayRate.value)} ${
                stat.shortName
              }/s`}
            </Typography>
          </Stack>
        </ProgressBarWithOverlay>
      ))}
    </Stack>
  );

  render() {
    const { gameTime, activeStats } = this.props;

    return (
      <Stack overflow="hidden" flex="1">
        {this.renderHeader(gameTime)}
        {this.renderActiveStatusBars(activeStats)}
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
      </Stack>
    );
  }
}

WanderPhase.propTypes = {
  gameTime: PropTypes.number.isRequired,
  activeStats: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      shortName: PropTypes.string.isRequired,
      currentDecayRate: PropTypes.shape({
        value: PropTypes.number.isRequired,
        modifiers: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            level: PropTypes.number.isRequired,
            multiplier: PropTypes.number.isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired,
      currentValue: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      maxValue: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (store) => ({
  gameTime: getGameTime(store),
  activeStats: getActiveStats(store),
});

export default connect(mapStateToProps)(WanderPhase);
