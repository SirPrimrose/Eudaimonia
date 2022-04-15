import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PHASES from '../../consts';
import { actions as phaseActions } from '../../../slice/gameSlice';
import { actions as textLogActions } from '../../../slice/textLogSlice';
import ProgressBarWithOverlay from '../../../shared/ProgressBarWithOverlay';
import { getWanderlust } from '../../../slice/statsSlice';

class PreparationPhase extends React.PureComponent {
  beginToWander = () => {
    const { setPhase, addMessage } = this.props;

    setPhase(PHASES.WANDER);
    addMessage('You take the first step...');
  };

  render() {
    const { wanderlust } = this.props;

    return (
      <div>
        <ProgressBarWithOverlay value={wanderlust}>
          Wanderlust
        </ProgressBarWithOverlay>
        <Button onClick={this.beginToWander}>Depart</Button>
      </div>
    );
  }
}

PreparationPhase.propTypes = {
  wanderlust: PropTypes.number.isRequired,
  setPhase: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  wanderlust: getWanderlust(state),
});

const mapDispatchToProps = {
  setPhase: phaseActions.setPhase,
  addMessage: textLogActions.addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparationPhase);
