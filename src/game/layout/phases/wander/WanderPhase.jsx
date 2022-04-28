import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions as textLogActions } from '../../../../slice/textLogSlice';
import JobActions from '../JobActions';
import { JOB_NAMES } from '../../../data/jobs';

// TODO: These jobs should come from redux as "wanderPhaseJobs"
const jobs = [JOB_NAMES.CUT_WOOD, JOB_NAMES.CATCH_FISH];

class WanderPhase extends React.PureComponent {
  render() {
    const { addMessage, clearMessages } = this.props;

    return (
      <div>
        <Button onClick={() => addMessage('Hello')}>Say hello</Button>
        <Button onClick={() => addMessage('Goodbye')}>Say goodbye</Button>
        <Button onClick={() => clearMessages()}>Clear messages</Button>
        <JobActions availableJobs={jobs} />
      </div>
    );
  }
}

WanderPhase.propTypes = {
  addMessage: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addMessage: textLogActions.addMessage,
  clearMessages: textLogActions.clearMessages,
};

export default connect(null, mapDispatchToProps)(WanderPhase);
