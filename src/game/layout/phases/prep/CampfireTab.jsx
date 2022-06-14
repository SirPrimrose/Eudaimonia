import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  actions as gameActions,
  getSoulpowerValue,
} from '../../../../slice/gameSlice';
import CircularDisplay from '../../../../shared/CircularDisplay';
import { toGameNumber } from '../../../format';

class CampfireTab extends React.PureComponent {
  render() {
    const { soulpowerValue } = this.props;

    return (
      <Stack
        height="100%"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <CircularDisplay>
          <Button>Upgrade 1</Button>
          <Button>Upgrade 1</Button>
          <Button>Upgrade 1</Button>
          <Button>Upgrade 1</Button>
          <Button>Upgrade 1</Button>
          <Button>Upgrade 1</Button>
          <Button>Upgrade 1</Button>
          <Button>Upgrade 1</Button>
          <Button>Upgrade 1</Button>
          <Button>Upgrade 1</Button>
        </CircularDisplay>
        <Typography variant="h4" position="absolute" top="46%">
          {`Soulpower: ${toGameNumber(soulpowerValue)}`}
        </Typography>
      </Stack>
    );
  }
}

CampfireTab.propTypes = {
  soulpowerValue: PropTypes.number.isRequired,
  addMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  soulpowerValue: getSoulpowerValue(state),
});

const mapDispatchToProps = {
  addMessage: gameActions.addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(CampfireTab);
