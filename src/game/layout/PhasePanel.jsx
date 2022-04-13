import React from 'react';
import PropTypes from 'prop-types';
import phases from '../consts';
import PreparationPhase from './phases/PreparationPhase';
import WanderPhase from './phases/WanderPhase';

const compForPhase = {
  [phases.Wander]: WanderPhase,
  [phases.Preparation]: PreparationPhase,
};

class PhasePanel extends React.PureComponent {
  render() {
    const { phase } = this.props;
    const PhaseComponent = compForPhase[phase];

    if (PhaseComponent) {
      return <PhaseComponent />;
    }
    return <div>Phase not found</div>;
  }
}

PhasePanel.propTypes = {
  phase: PropTypes.string.isRequired,
};

export default PhasePanel;
