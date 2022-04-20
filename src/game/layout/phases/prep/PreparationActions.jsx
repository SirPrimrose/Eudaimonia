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

class PreparationActions extends React.PureComponent {
  beginPacing = () => {
    const { addJob } = this.props;

    addJob(createJobQueueEntry(JOB_NAMES.PACE));
  };

  render() {
    const { getProgress } = this.props;

    return (
      <Stack className="prepActions">
        <Button onClick={this.beginPacing}>{JOB_NAMES.PACE}</Button>
        <LinearProgress
          variant="determinate"
          value={getProgress(JOB_NAMES.PACE)}
        />
        <Button onClick={this.beginPondering}>Ponder</Button>
        <Button onClick={this.beginMeditating}>Meditate</Button>
      </Stack>
    );
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
