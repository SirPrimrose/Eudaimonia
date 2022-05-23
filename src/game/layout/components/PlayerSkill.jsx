import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faPersonRunning,
  faPlay,
  faTriangleCircleSquare,
} from '@fortawesome/free-solid-svg-icons';
import { getProgressValue } from '../../../shared/util';
import { STAT_NAMES } from '../../data/stats';

class PlayerSkill extends React.PureComponent {
  getTooltipValue = (skillName, currentLevel, permLevel) => (
    <Stack alignItems="center">
      <Typography variant="body1">{skillName}</Typography>
      <Typography variant="body2">{`Current: ${currentLevel} Perm: ${permLevel}`}</Typography>
    </Stack>
  );

  getIconForSkillType = () => <FontAwesomeIcon icon={faPersonRunning} />;

  render() {
    const {
      skillName,
      currentLevel,
      currentXp,
      currentLevelXpReq,
      permLevel,
      permXp,
      permLevelXpReq,
      xpScaling,
    } = this.props;

    // TODO: Add number formatter for xpScaling
    // TODO: Add icons for skills from skills.js
    return (
      <Grid item xs={4}>
        <Tooltip
          title={this.getTooltipValue(skillName, currentLevel, permLevel)}
          disableInteractive
        >
          <Stack>
            <Typography noWrap align="center" variant="subtitle2">
              {this.getIconForSkillType(skillName)}
              {`⨯${xpScaling.toFixed(2)}`}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={getProgressValue(currentXp, currentLevelXpReq)}
            />

            <LinearProgress
              variant="determinate"
              value={getProgressValue(permXp, permLevelXpReq)}
            />
          </Stack>
        </Tooltip>
      </Grid>
    );
  }
}

PlayerSkill.propTypes = {
  skillName: PropTypes.string.isRequired,
  currentLevel: PropTypes.number.isRequired,
  currentXp: PropTypes.number.isRequired,
  currentLevelXpReq: PropTypes.number.isRequired,
  permLevel: PropTypes.number.isRequired,
  permXp: PropTypes.number.isRequired,
  permLevelXpReq: PropTypes.number.isRequired,
  xpScaling: PropTypes.number.isRequired,
};

export default PlayerSkill;
