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
import { getIconForHealType } from '../../data/Icons';

class PlayerItem extends React.PureComponent {
  getTooltipValue = (healType, healPerSecond, flavorText) => {
    if (healType) {
      return (
        <Stack alignItems="center">
          <Typography variant="body2">{flavorText}</Typography>
          <Typography variant="body2">
            Heals {healPerSecond} {getIconForHealType(healType)} per second
          </Typography>
        </Stack>
      );
    }
    return <Typography variant="body2">{flavorText}</Typography>;
  };

  render() {
    const { itemName, currentAmount, maxAmount, healType, healPerSecond } =
      this.props;
    // TODO: Add currentCooldown and maxCooldown properties to tooltip display

    return (
      <Grid container pb={1}>
        <Tooltip
          title={this.getTooltipValue(
            healType,
            healPerSecond,
            'Used in basic constructions.'
          )}
          disableInteractive
        >
          <Grid item container xs={12} alignItems="center">
            <Grid item xs="auto">
              <Typography noWrap>{`${itemName}`}</Typography>
            </Grid>
            <Grid item xs>
              <Typography
                textAlign="right"
                pr={1}
              >{`${currentAmount} / ${maxAmount}`}</Typography>
            </Grid>
            <Grid item xs={1}>
              {healType && (
                <Typography>{getIconForHealType(healType)}</Typography>
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
  itemName: PropTypes.string.isRequired,
  currentAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  healType: PropTypes.string,
  healPerSecond: PropTypes.number,
};

PlayerItem.defaultProps = {
  healType: undefined,
  healPerSecond: 0,
};

export default PlayerItem;
