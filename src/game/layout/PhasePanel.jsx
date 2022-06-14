import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PreparationPhase from './phases/prep/PreparationPhase';
import WanderPhase from './phases/wander/WanderPhase';
import { getGamePhase } from '../../slice/gameSlice';
import { PHASES } from '../consts';

const compForPhase = {
  [PHASES.WANDER]: WanderPhase,
  [PHASES.PREP]: PreparationPhase,
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

const mapStateToProps = (state) => ({
  phase: getGamePhase(state),
});

export default connect(mapStateToProps)(PhasePanel);
