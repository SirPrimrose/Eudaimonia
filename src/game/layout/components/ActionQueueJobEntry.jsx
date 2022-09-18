import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { getJobById } from '../../../slice/gameSlice';

class ActionQueueJobEntry extends React.PureComponent {
  render() {
    const { queueEntryIndex, queueEntry, handleCancelJob, job } = this.props;

    const jobMessage =
      queueEntry.iterations > 0
        ? `${job.name} (x${queueEntry.iterations})`
        : `${job.name}`;
    return (
      <Grid container item xs={12} key={queueEntry.queueId} alignItems="center">
        <Grid item xs={1.5}>
          <Typography>{`${queueEntryIndex + 1}.`}</Typography>
        </Grid>
        <Grid item xs>
          <Typography>{jobMessage}</Typography>
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={handleCancelJob(queueEntry.queueId)}>
            <FontAwesomeIcon icon={faXmarkCircle} />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

ActionQueueJobEntry.propTypes = {
  queueEntryIndex: PropTypes.number.isRequired,
  queueEntry: PropTypes.shape({
    queueId: PropTypes.string.isRequired,
    jobId: PropTypes.string.isRequired,
    iterations: PropTypes.number.isRequired,
  }).isRequired,
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completionEvents: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        value: PropTypes.object.isRequired,
      })
    ),
    usedItems: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,

  handleCancelJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { queueEntry } = ownProps;

  return {
    job: getJobById(state, queueEntry.jobId),
  };
};

export default connect(mapStateToProps)(ActionQueueJobEntry);
