import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { getSkills } from '../../slice/gameSlice';
import PlayerSkill from './components/PlayerSkill';

class SkillPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeSkills: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { skills } = this.props;
    if (skills !== prevProps.skills) {
      const activeSkills = Object.values(skills).filter(
        (skill) => skill.permLevel > 0 || skill.permXp > 0
      );
      this.setState(() => ({ activeSkills }));
    }
  }

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
    const { activeSkills } = this.state;
    return (
      <div className="panelOutline">
        <Typography variant="h6" align="center" className="title">
          Skills
        </Typography>
        {this.getSkillLayout(activeSkills)}
      </div>
    );
  }
}

SkillPanel.propTypes = {
  skills: PropTypes.objectOf(
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
  skills: getSkills(state),
});

export default connect(mapStateToProps)(SkillPanel);
