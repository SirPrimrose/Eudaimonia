import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  actions as gameActions,
  getGameTime,
  getSoulpowerValue,
  getStatByName,
} from '../../../../slice/gameSlice';
import { STAT_NAMES } from '../../../data/stats';
import { toClockTime } from '../../../../shared/format';

class PreparationPhase extends React.PureComponent {
  beginToWander = () => {
    const { reviveCharacter, addMessage } = this.props;

    reviveCharacter();
    addMessage('You take another step...');
  };

  render() {
    const { gameTime, soulpowerValue } = this.props;
    // TODO: Update layout to match design...
    // TODO: Side menu showing different prep phase locations
    // TODO: "Campfire" for spending Soul on permanent upgrades
    // TODO: "Town" for getting quests
    // TODO: "Monuments" for spending items gained from travelling
    return (
      <Stack>
        <Typography
          variant="h3"
          align="center"
        >{`This shell lasted ${toClockTime(gameTime)}`}</Typography>
        <Typography variant="h4" align="center">
          {`Your consciousness receeds while retaining ${soulpowerValue} soul.`}
        </Typography>
        <Button onClick={this.beginToWander}>Depart</Button>
      </Stack>
    );
  }
}

PreparationPhase.propTypes = {
  gameTime: PropTypes.number.isRequired,
  soulpowerValue: PropTypes.number.isRequired,
  reviveCharacter: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const prepTime = getStatByName(state)(STAT_NAMES.PREP_TIME);
  return {
    gameTime: getGameTime(state),
    soulpowerValue: getSoulpowerValue(state),
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
