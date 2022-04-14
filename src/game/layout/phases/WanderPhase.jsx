/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { actions as textLogActions } from '../../../slice/textLogSlice';

class WanderPhase extends React.PureComponent {
  render() {
    const { addMessage, clearMessages } = this.props;
    return (
      <div>
        <Button onClick={() => addMessage('Hello')}>Say hello</Button>
        <Button onClick={() => addMessage('Goodbye')}>Say goodbye</Button>
        <Button onClick={() => clearMessages()}>Clear messages</Button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addMessage: textLogActions.addMessage,
  clearMessages: textLogActions.clearMessages,
};

export default connect(null, mapDispatchToProps)(WanderPhase);
