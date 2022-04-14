import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PHASES from '../../consts';
import { actions as phaseActions } from '../../../slice/gameSlice';

class PreparationPhase extends React.PureComponent {
  render() {
    const { setPhase } = this.props;
    return (
      <div>
        <Button onClick={() => setPhase(PHASES.WANDER)}>Depart</Button>
      </div>
    );
  }
}

PreparationPhase.propTypes = {
  setPhase: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setPhase: phaseActions.setPhase,
};

export default connect(null, mapDispatchToProps)(PreparationPhase);
