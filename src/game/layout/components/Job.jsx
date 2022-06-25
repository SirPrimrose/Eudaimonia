import React from 'react';
import PropTypes from 'prop-types';
import { Button, LinearProgress, Stack } from '@mui/material';
import { connect } from 'react-redux';
import { getProgressValue } from '../../../shared/util';
import { actions as gameActions } from '../../../slice/gameSlice';
import { createJobQueueEntry } from '../../data/jobConstructor';

class Job extends React.PureComponent {
  handleClickJob = (jobId) => () => {
    const { addJobToQueue, setPaused } = this.props;

    addJobToQueue(createJobQueueEntry(jobId));
    setPaused(false);
  };

  handleContextMenu = (jobId) => (event) => {
    const { addJobToQueue, setPaused } = this.props;

    event.preventDefault();

    addJobToQueue(createJobQueueEntry(jobId, 1));
    setPaused(false);
  };

  render() {
    const {
      job: { id, name, currentXp, maxXp },
    } = this.props;

    return (
      <Stack
        onContextMenu={this.handleContextMenu(id)}
        style={{
          position: 'relative',
        }}
      >
        <Button onClick={this.handleClickJob(id)} sx={{ zIndex: 1 }}>
          {name}
        </Button>
        <LinearProgress
          variant="determinate"
          value={getProgressValue(currentXp, maxXp)}
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}
        />
      </Stack>
    );
  }
}

Job.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    currentXp: PropTypes.number.isRequired,
    maxXp: PropTypes.number.isRequired,
  }).isRequired,

  // Dispatch functions
  addJobToQueue: PropTypes.func.isRequired,
  unshiftJobToQueue: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addJobToQueue: gameActions.addJobToQueue,
  unshiftJobToQueue: gameActions.unshiftJobToQueue,
  setPaused: gameActions.setPaused,
};

export default connect(null, mapDispatchToProps)(Job);
