import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PHASES from '../../consts';
import { actions as phaseActions } from '../../../slice/gameSlice';
import { actions as textLogActions } from '../../../slice/textLogSlice';

class PreparationPhase extends React.PureComponent {
  beginToWander = () => {
    const { setPhase, addMessage } = this.props;

    setPhase(PHASES.WANDER);
    addMessage('You take the first step...');
  };

  render() {
    return (
      <div>
        <Button onClick={this.beginToWander}>Depart</Button>
      </div>
    );
  }
}

PreparationPhase.propTypes = {
  setPhase: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setPhase: phaseActions.setPhase,
  addMessage: textLogActions.addMessage,
};

export default connect(null, mapDispatchToProps)(PreparationPhase);
