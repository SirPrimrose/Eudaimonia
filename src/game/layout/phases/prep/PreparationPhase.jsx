import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PHASES } from '../../../../shared/consts';
import { actions as phaseActions } from '../../../../slice/gameSlice';
import { actions as textLogActions } from '../../../../slice/textLogSlice';
import ProgressBarWithOverlay from '../../../../shared/ProgressBarWithOverlay';
import { getStatByName } from '../../../../slice/statsSlice';
import { getProgressValue } from '../../../../shared/util';
import PreparationActions from './PreparationActions';
import { STAT_NAMES } from '../../../data/stats';

class PreparationPhase extends React.PureComponent {
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
        <PreparationActions />
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
};

const mapStateToProps = (state) => {
  const prepTime = getStatByName(state)(STAT_NAMES.PREP_TIME);
  return {
    wanderlust: prepTime.currentValue,
    maxWanderlust: prepTime.maxValue,
  };
};

const mapDispatchToProps = {
  setPhase: phaseActions.setPhase,
  addMessage: textLogActions.addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparationPhase);
