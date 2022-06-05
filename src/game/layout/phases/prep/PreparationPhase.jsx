import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PHASES } from '../../../../shared/consts';
import {
  actions as gameActions,
  getGameTime,
  getStatByName,
} from '../../../../slice/gameSlice';
import { STAT_NAMES } from '../../../data/stats';

class PreparationPhase extends React.PureComponent {
  beginToWander = () => {
    const { reviveCharacter, addMessage } = this.props;

    reviveCharacter();
    addMessage('You take another step...');
  };

  render() {
    // TODO: Update layout to match design...
    // TODO: Side menu showing different prep phase locations
    // TODO: "Campfire" for spending Soul on permanent upgrades
    // TODO: "Town" for getting quests
    // TODO: "Monuments" for spending items gained from travelling
    return (
      <div>
        <Button onClick={this.beginToWander}>Depart</Button>
      </div>
    );
  }
}

PreparationPhase.propTypes = {
  reviveCharacter: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const prepTime = getStatByName(state)(STAT_NAMES.PREP_TIME);
  return {
    gameTime: getGameTime(state),
    wanderlust: prepTime.currentValue,
    maxWanderlust: prepTime.maxValue,
    currentWanderlustDecay: prepTime.currentDecayRate,
  };
};

const mapDispatchToProps = {
  reviveCharacter: gameActions.reviveCharacter,
  addMessage: gameActions.addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparationPhase);
