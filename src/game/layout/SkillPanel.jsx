import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Stack, Typography } from '@mui/material';
import { getInventory } from '../../slice/inventorySlice';
import PlayerItem from './components/PlayerItem';
import { getSkills } from '../../slice/skillSlice';
import PlayerSkill from './components/PlayerSkill';

class SkillPanel extends React.PureComponent {
  getSkillLayout = (skills) => (
    <div className="panelGrid">
      <Grid container columns={8} p={1} spacing={1}>
        {Object.entries(skills).map(([skillName, skill]) => (
          <PlayerSkill
            key={skillName}
            skillName={skillName}
            currentLevel={skill.currentLevel}
            currentXp={skill.currentXp}
            currentLevelXpReq={skill.currentLevelXpReq}
            permLevel={skill.permLevel}
            permXp={skill.permXp}
            permLevelXpReq={skill.permLevelXpReq}
            xpScaling={skill.xpScaling}
          />
        ))}
      </Grid>
    </div>
  );

  render() {
    const { skills } = this.props;
    return (
      <div className="panelOutline">
        <Typography variant="h6" align="center" className="title">
          Skills
        </Typography>
        {this.getSkillLayout(skills)}
      </div>
    );
  }
}

SkillPanel.propTypes = {
  skills: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      currentLevel: PropTypes.number.isRequired,
      currentXp: PropTypes.number.isRequired,
      currentLevelXpReq: PropTypes.number.isRequired,
      permLevel: PropTypes.number.isRequired,
      permXp: PropTypes.number.isRequired,
      permLevelXpReq: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  skills: getSkills(state),
});

export default connect(mapStateToProps)(SkillPanel);
