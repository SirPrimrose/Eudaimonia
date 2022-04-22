import { Button, LinearProgress, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  actions as jobActions,
  getJobProgress,
} from '../../../../slice/jobSlice';
import { actions as gameActions } from '../../../../slice/gameSlice';
import { JOB_NAMES } from '../../../jobs';
import { createJobQueueEntry } from '../../../jobConstructor';

const availableJobs = [JOB_NAMES.PACE, JOB_NAMES.WANDER];
class PreparationActions extends React.PureComponent {
  handleClickJob = (jobName) => () => {
    const { addJobToQueue, setPaused } = this.props;

    addJobToQueue(createJobQueueEntry(jobName));
    setPaused(false);
  };

  renderAvailableJobs = () => {
    const { getProgress } = this.props;

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

PreparationActions.propTypes = {
  getProgress: PropTypes.func.isRequired,
  addJobToQueue: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getProgress: getJobProgress(state),
});

const mapDispatchToProps = {
  addJobToQueue: jobActions.addJobToQueue,
  setPaused: gameActions.setPaused,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparationActions);
