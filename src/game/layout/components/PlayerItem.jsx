import React from 'react';
import PropTypes from 'prop-types';
import { Grid, LinearProgress, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faPlay,
  faTriangleCircleSquare,
} from '@fortawesome/free-solid-svg-icons';
import { getProgressValue } from '../../../shared/util';
import { STAT_NAMES } from '../../data/stats';

class PlayerItem extends React.PureComponent {
  getIconForHealType = (healType) => {
    switch (healType) {
      case STAT_NAMES.HEALTH:
        return <FontAwesomeIcon icon={faHeart} />;
      case STAT_NAMES.MAGIC:
        return (
          <FontAwesomeIcon
            icon={faPlay}
            style={{ transform: 'rotate(-90deg)' }}
          />
        );
      default:
        return <FontAwesomeIcon icon={faTriangleCircleSquare} />;
    }
  };

  render() {
    const { itemName, currentAmount, maxAmount, healType, healPerSecond } =
      this.props;

    return (
      <Grid container pb={1} alignItems="center">
        <Grid item xs={7}>
          <Typography noWrap>{`${itemName}`}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            textAlign="right"
            pr={1}
          >{`${currentAmount} / ${maxAmount}`}</Typography>
        </Grid>
        <Grid item xs={2}>
          {healType ? (
            <Typography variant="body2">
              {healPerSecond} {this.getIconForHealType(healType)}/s
            </Typography>
          ) : (
            <div />
          )}
        </Grid>
        {healType && (
          <Grid item xs={12}>
            <LinearProgress
              variant="determinate"
              value={getProgressValue(currentAmount, maxAmount)}
            />
          </Grid>
        )}
      </Grid>
    );
  }
}

PlayerItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  currentAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  healType: PropTypes.number.isRequired,
  healPerSecond: PropTypes.number.isRequired,
};

export default PlayerItem;
