import { Button, LinearProgress, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  actions as gameActions,
  getJobById,
  getJobProgress,
} from '../../../slice/gameSlice';
import { createJobQueueEntry } from '../../data/jobConstructor';

class JobActions extends React.PureComponent {
  handleClickJob = (jobName) => () => {
    const { addJobToQueue, setPaused } = this.props;

    addJobToQueue(createJobQueueEntry(jobName));
    setPaused(false);
  };

  renderAvailableJobs = () => {
    const { availableJobs, getProgress, getJob } = this.props;

    // TODO: Render a job in its own component, pass job data to component
    return availableJobs.map((jobId) => {
      const jobData = getJob(jobId);

      return (
        <Stack
          key={jobId}
          style={{
            position: 'relative',
          }}
        >
          <Button onClick={this.handleClickJob(jobId)} sx={{ zIndex: 1 }}>
            {jobData.name}
          </Button>
          <LinearProgress
            variant="determinate"
            value={getProgress(jobId)}
            sx={{
              position: 'absolute',
              width: '100%',
              bottom: 0,
            }}
          />
        </Stack>
      );
    });
  };

  render() {
    return <Stack pb={1}>{this.renderAvailableJobs()}</Stack>;
  }
}

JobActions.propTypes = {
  availableJobs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

  // Dispatch functions
  getProgress: PropTypes.func.isRequired,
  getJob: PropTypes.func.isRequired,
  addJobToQueue: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getProgress: getJobProgress(state),
  getJob: getJobById(state),
});

const mapDispatchToProps = {
  addJobToQueue: gameActions.addJobToQueue,
  setPaused: gameActions.setPaused,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobActions);
