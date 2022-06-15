import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { getProgressValue } from '../../../shared/util';
import { getIconForSkillType } from './Icons';
import { MULTIPLICATION_SIGN } from '../../consts';
import { toGameNumber } from '../../format';

const columns = ['Effect', 'Level', 'Multiplier'];

class PlayerSkill extends React.PureComponent {
  getTooltipValue = () => {
    const {
      skill: { name, xpScaling },
    } = this.props;

    return (
      <Stack alignItems="center">
        <Typography variant="h6">{name}</Typography>
        <Grid container>
          {columns.map((col) => (
            <Grid key={col} item xs={12 / columns.length}>
              <Typography variant="body1" align="right">
                {col}
              </Typography>
            </Grid>
          ))}
          {xpScaling.modifiers.map((mod) => (
            <Fragment key={mod.name}>
              <Grid item xs={12 / columns.length}>
                <Typography variant="body2" align="right">
                  {mod.name}
                </Typography>
              </Grid>
              <Grid item xs={12 / columns.length}>
                <Typography variant="body2" align="right">
                  {mod.level !== -1 ? toGameNumber(mod.level) : ''}
                </Typography>
              </Grid>
              <Grid item xs={12 / columns.length}>
                <Typography variant="body2" align="right">
                  {`${MULTIPLICATION_SIGN}${toGameNumber(mod.multiplier)}`}
                </Typography>
              </Grid>
            </Fragment>
          ))}
          <Grid item xs={12 / columns.length}>
            <Typography variant="body2" align="right">
              Total
            </Typography>
          </Grid>
          <Grid item xs={12 / columns.length} />
          <Grid item xs={12 / columns.length}>
            <Typography variant="body2" align="right">
              {`${MULTIPLICATION_SIGN}${toGameNumber(xpScaling.value)}`}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    );
  };

  render() {
    const {
      skill: {
        name,
        currentXp,
        currentLevelXpReq,
        permXp,
        permLevelXpReq,
        xpScaling,
      },
    } = this.props;

    return (
      <Grid item xs={4}>
        <Tooltip title={this.getTooltipValue()} disableInteractive>
          <Stack spacing={0.25}>
            <Typography noWrap align="center" variant="subtitle2">
              {getIconForSkillType(name)}
              {` ${MULTIPLICATION_SIGN} ${toGameNumber(xpScaling.value)}`}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={getProgressValue(currentXp, currentLevelXpReq)}
              color="primary"
            />

            <LinearProgress
              variant="determinate"
              value={getProgressValue(permXp, permLevelXpReq)}
              color="secondary"
            />
          </Stack>
        </Tooltip>
      </Grid>
    );
  }
}

PlayerSkill.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currentLevel: PropTypes.number.isRequired,
    currentXp: PropTypes.number.isRequired,
    currentLevelXpReq: PropTypes.number.isRequired,
    permLevel: PropTypes.number.isRequired,
    permXp: PropTypes.number.isRequired,
    permLevelXpReq: PropTypes.number.isRequired,
    xpScaling: PropTypes.shape({
      value: PropTypes.number.isRequired,
      modifiers: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          level: PropTypes.number.isRequired,
          multiplier: PropTypes.number.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PlayerSkill;
