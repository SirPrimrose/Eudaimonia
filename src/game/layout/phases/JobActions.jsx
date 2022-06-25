import { Button, LinearProgress, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions as gameActions } from '../../../slice/gameSlice';
import { createJobQueueEntry } from '../../data/jobConstructor';
import { getProgressValue } from '../../../shared/util';

class JobActions extends React.PureComponent {
  handleClickJob = (jobName) => () => {
    const { addJobToQueue, setPaused } = this.props;

    addJobToQueue(createJobQueueEntry(jobName));
    setPaused(false);
  };

  renderAvailableJobs = () => {
    const { availableJobs } = this.props;

    // TODO: Render a job in its own component, pass job data to component
    return availableJobs.map((job) => (
      <Stack
        key={job.id}
        style={{
          position: 'relative',
        }}
      >
        <Button onClick={this.handleClickJob(job.id)} sx={{ zIndex: 1 }}>
          {job.name}
        </Button>
        <LinearProgress
          variant="determinate"
          value={getProgressValue(job.currentXp, job.maxXp)}
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}
        />
      </Stack>
    ));
  };

  render() {
    return <Stack pb={1}>{this.renderAvailableJobs()}</Stack>;
  }
}

JobActions.propTypes = {
  availableJobs: PropTypes.arrayOf(
    PropTypes.shape({
      isActive: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      currentXp: PropTypes.number.isRequired,
      maxXp: PropTypes.number.isRequired,
    })
  ).isRequired,

  // Dispatch functions
  addJobToQueue: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addJobToQueue: gameActions.addJobToQueue,
  setPaused: gameActions.setPaused,
};

export default connect(null, mapDispatchToProps)(JobActions);
