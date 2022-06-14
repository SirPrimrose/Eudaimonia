import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { getProgressValue } from '../../../shared/util';
import { getIconForStatType } from './Icons';
import { STAT_NAMES } from '../../data/stats';

class PlayerItem extends React.PureComponent {
  getTooltipValue = (healType, healAmount, description) => {
    if (healType) {
      return (
        <Stack alignItems="center">
          <Typography variant="body2">{description}</Typography>
          <Typography variant="body2">
            Restores {healAmount / 5} {getIconForStatType(healType)} per second
          </Typography>
        </Stack>
      );
    }
    return <Typography variant="body2">{description}</Typography>;
  };

  render() {
    const {
      item: {
        name,
        currentAmount,
        maxAmount,
        healType,
        healAmount,
        description,
        currentCooldown,
        maxCooldown,
      },
    } = this.props;

    // TODO: Make the linear progress into a circular progress that masks the icon used for healing
    return (
      <Grid container pb={1}>
        <Tooltip
          title={this.getTooltipValue(healType, healAmount, description)}
          disableInteractive
        >
          <Grid item container xs={12} alignItems="center">
            <Grid item xs="auto">
              <Typography noWrap>{`${name}`}</Typography>
            </Grid>
            <Grid item xs>
              <Typography
                textAlign="right"
                pr={1}
              >{`${currentAmount} / ${maxAmount}`}</Typography>
            </Grid>
            <Grid item xs={1}>
              {healType !== STAT_NAMES.NONE && (
                <Typography>{getIconForStatType(healType)}</Typography>
              )}
            </Grid>
          </Grid>
        </Tooltip>
        {healType !== STAT_NAMES.NONE && (
          <Tooltip
            title={`${currentCooldown}s/${maxCooldown}s Cooldown`}
            disableInteractive
          >
            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={getProgressValue(currentCooldown, maxCooldown)}
              />
            </Grid>
          </Tooltip>
        )}
      </Grid>
    );
  }
}

PlayerItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currentAmount: PropTypes.number.isRequired,
    maxAmount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    healType: PropTypes.string.isRequired,
    healAmount: PropTypes.number.isRequired,
    currentCooldown: PropTypes.number.isRequired,
    maxCooldown: PropTypes.number.isRequired,
  }).isRequired,
};

export default PlayerItem;
