import { Button, LinearProgress, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  actions as gameActions,
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
    // TODO: Render jobs by job category (1 column each category, except exploration and progression combined into 1 column)
    const { availableJobs, getProgress } = this.props;

    return availableJobs.map((jobName) => (
      <div key={jobName}>
        <Button onClick={this.handleClickJob(jobName)}>{jobName}</Button>
        <LinearProgress variant="determinate" value={getProgress(jobName)} />
      </div>
    ));
  };

  render() {
    return <Stack className="prepActions">{this.renderAvailableJobs()}</Stack>;
  }
}

JobActions.propTypes = {
  availableJobs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

  // Dispatch functions
  getProgress: PropTypes.func.isRequired,
  addJobToQueue: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getProgress: getJobProgress(state),
});

const mapDispatchToProps = {
  addJobToQueue: gameActions.addJobToQueue,
  setPaused: gameActions.setPaused,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobActions);
