import { Button, LinearProgress, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  actions as jobActions,
  getJobProgress,
} from '../../../../slice/jobSlice';
import { JOB_NAMES } from '../../../jobs';
import { createJobQueueEntry } from '../../../jobConstructor';

const availableJobs = [JOB_NAMES.PACE, JOB_NAMES.WANDER];
class PreparationActions extends React.PureComponent {
  renderAvailableJobs = () => {
    const { getProgress, addJobToQueue } = this.props;

    return availableJobs.map((jobName) => (
      <>
        <Button onClick={() => addJobToQueue(createJobQueueEntry(jobName))}>
          {jobName}
        </Button>
        <LinearProgress variant="determinate" value={getProgress(jobName)} />
      </>
    ));
  };

  render() {
    return <Stack className="prepActions">{this.renderAvailableJobs()}</Stack>;
  }
}

PreparationActions.propTypes = {
  getProgress: PropTypes.func.isRequired,
  addJobToQueue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getProgress: getJobProgress(state),
});

const mapDispatchToProps = {
  addJobToQueue: jobActions.addJobToQueue,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparationActions);
