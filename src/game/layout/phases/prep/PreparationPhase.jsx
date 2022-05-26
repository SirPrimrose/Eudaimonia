import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PHASES } from '../../../../shared/consts';
import {
  actions as gameActions,
  getGameTime,
  getCurrentJobs,
  getStatByName,
} from '../../../../slice/gameSlice';
import ProgressBarWithOverlay from '../../../../shared/ProgressBarWithOverlay';
import { getProgressValue } from '../../../../shared/util';
import { STAT_NAMES } from '../../../data/stats';
import JobActions from '../JobActions';
import { JOB_NAMES } from '../../../data/jobs';

class PreparationPhase extends React.PureComponent {
  beginToWander = () => {
    const { setPhase, addMessage } = this.props;

    setPhase(PHASES.WANDER);
    addMessage('You take the first step...');
  };

  render() {
    const {
      gameTime,
      currentJobs,
      wanderlust,
      maxWanderlust,
      currentWanderlustDecay,
    } = this.props;
    const shouldShowDepart = wanderlust >= maxWanderlust;

    return (
      <div>
        <JobActions availableJobs={currentJobs} />
        <Button onClick={this.beginToWander}>Depart</Button>
      </div>
    );
  }
}

PreparationPhase.propTypes = {
  currentJobs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  gameTime: PropTypes.number.isRequired,
  wanderlust: PropTypes.number.isRequired,
  maxWanderlust: PropTypes.number.isRequired,
  currentWanderlustDecay: PropTypes.number.isRequired,
  setPhase: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const prepTime = getStatByName(state)(STAT_NAMES.PREP_TIME);
  return {
    currentJobs: getCurrentJobs(state),
    gameTime: getGameTime(state),
    wanderlust: prepTime.currentValue,
    maxWanderlust: prepTime.maxValue,
    currentWanderlustDecay: prepTime.currentDecayRate,
  };
};

const mapDispatchToProps = {
  setPhase: gameActions.setPhase,
  addMessage: gameActions.addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparationPhase);
