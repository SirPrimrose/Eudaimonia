import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  actions as gameActions,
  getGameTime,
  getSoulpowerValue,
} from '../../../../slice/gameSlice';
import { toClockTime } from '../../../format';

class DeathTab extends React.PureComponent {
  beginToWander = () => {
    const { reviveCharacter, addMessage } = this.props;

    reviveCharacter();
    addMessage('You take another step...');
  };

  render() {
    const { gameTime, soulpowerValue } = this.props;

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

DeathTab.propTypes = {
  gameTime: PropTypes.number.isRequired,
  soulpowerValue: PropTypes.number.isRequired,
  reviveCharacter: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  gameTime: getGameTime(state),
  soulpowerValue: getSoulpowerValue(state),
});

const mapDispatchToProps = {
  reviveCharacter: gameActions.reviveCharacter,
  addMessage: gameActions.addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeathTab);
