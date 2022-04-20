import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PHASES } from '../consts';
import PreparationPhase from './phases/prep/PreparationPhase';
import WanderPhase from './phases/wander/WanderPhase';
import { getGamePhase } from '../../slice/gameSlice';

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
