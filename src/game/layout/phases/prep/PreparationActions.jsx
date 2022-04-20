import { Button, LinearProgress, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  actions as jobQueueActions,
  getJobProgress,
} from '../../../../slice/jobQueueSlice';
import { JOB_NAMES } from '../../../jobs';
import { createJobQueueEntry } from '../../../jobConstructor';

const availableJobs = [JOB_NAMES.PACE, JOB_NAMES.WANDER];
class PreparationActions extends React.PureComponent {
  beginPacing = () => {
    const { addJob } = this.props;

    addJob(createJobQueueEntry(JOB_NAMES.PACE));
  };

  renderAvailableJobs = () => {
    const { getProgress } = this.props;

    return availableJobs.map((job) => (
      <>
        <Button onClick={this.beginPacing}>{job}</Button>
        <LinearProgress variant="determinate" value={getProgress(job)} />
      </>
    ));
  };

  render() {
    return <Stack className="prepActions">{this.renderAvailableJobs()}</Stack>;
  }
}

PreparationActions.propTypes = {
  getProgress: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getProgress: getJobProgress(state),
});

const mapDispatchToProps = {
  addJob: jobQueueActions.addJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreparationActions);
