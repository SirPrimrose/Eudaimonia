import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { getSkillsWithLevels } from '../../slice/gameSlice';
import PlayerSkill from './components/PlayerSkill';

class SkillPanel extends React.PureComponent {
  getSkillLayout = (skills) => {
    const numOfColumns = (Math.floor((skills.length - 1) / 6) + 1) * 4;

    return (
      <div className="panelGrid">
        <Grid container columns={numOfColumns} p={1} spacing={1}>
          {skills.map((skill) => (
            <PlayerSkill key={skill.id} skill={skill} />
          ))}
        </Grid>
      </div>
    );
  };

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
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
          })
        ).isRequired,
      }).isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  skills: getSkillsWithLevels(state),
});

export default connect(mapStateToProps)(SkillPanel);
