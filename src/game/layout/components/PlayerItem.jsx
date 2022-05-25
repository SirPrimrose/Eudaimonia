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
      },
    } = this.props;
    // TODO: Add currentCooldown and maxCooldown properties to tooltip display

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
              {healType && (
                <Typography>{getIconForStatType(healType)}</Typography>
              )}
            </Grid>
          </Grid>
        </Tooltip>
        {healType && (
          <Tooltip title="0.3s/4.6s Cooldown" disableInteractive>
            <Grid item xs={12}>
              <LinearProgress
                variant="determinate"
                value={getProgressValue(currentAmount, maxAmount)}
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
  }).isRequired,
};

export default PlayerItem;
