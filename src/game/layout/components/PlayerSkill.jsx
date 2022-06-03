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
import { getIconForSkillType } from './Icons';

class PlayerSkill extends React.PureComponent {
  getTooltipValue = (skillName, currentLevel, permLevel) => (
    <Stack alignItems="center">
      <Typography variant="body1">{skillName}</Typography>
      <Typography variant="body2">{`Current: ${currentLevel} Perm: ${permLevel}`}</Typography>
    </Stack>
  );

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
          <Stack spacing={0.25}>
            <Typography noWrap align="center" variant="subtitle2">
              {getIconForSkillType(skillName)}
              {`⨯${xpScaling.value.toFixed(2)}`}
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
  skillName: PropTypes.string.isRequired,
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
        multiplier: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export default PlayerSkill;
