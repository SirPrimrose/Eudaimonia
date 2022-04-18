import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PHASES from '../../consts';
import { actions as phaseActions } from '../../../slice/gameSlice';
import { actions as textLogActions } from '../../../slice/textLogSlice';
import { actions as jobQueueActions } from '../../../slice/jobQueueSlice';
import ProgressBarWithOverlay from '../../../shared/ProgressBarWithOverlay';
import {
  actions as statsActions,
  getMaxWanderlust,
  getWanderlust,
} from '../../../slice/statsSlice';
import { getProgressValue } from '../../../shared/util';

class PreparationPhase extends React.PureComponent {
  beginPacing = () => {
    const { addJob } = this.props;

    addJob({ name: 'Pace' });
  };

  beginToWander = () => {
    const { setPhase, addMessage } = this.props;

    setPhase(PHASES.WANDER);
    addMessage('You take the first step...');
  };

  render() {
    const { wanderlust, maxWanderlust } = this.props;
    const shouldShowDepart = wanderlust >= maxWanderlust;

    return (
      <div>
        <ProgressBarWithOverlay
          value={getProgressValue(wanderlust, maxWanderlust)}
        >
          Wanderlust
        </ProgressBarWithOverlay>
        <Button onClick={this.beginPacing}>Pace</Button>
        <Button onClick={this.beginPondering}>Ponder</Button>
        <Button onClick={this.beginMeditating}>Meditate</Button>
        {shouldShowDepart && (
          <Button onClick={this.beginToWander}>Depart</Button>
        )}
      </div>
    );
  }
}

PreparationPhase.propTypes = {
  wanderlust: PropTypes.number.isRequired,
  maxWanderlust: PropTypes.number.isRequired,
  setPhase: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  addWanderlust: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wanderlust: getWanderlust(state),
  maxWanderlust: getMaxWanderlust(state),
});

const mapDispatchToProps = {
  setPhase: phaseActions.setPhase,
  addMessage: textLogActions.addMessage,
  addWanderlust: statsActions.addWanderlust,
  addJob: jobQueueActions.addJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparationPhase);
