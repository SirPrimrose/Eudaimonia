import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import {
  actions as gameActions,
  getJobById,
  getJobQueue,
  isGamePaused,
} from '../../slice/gameSlice';

class ActionQueuePanel extends React.PureComponent {
  handlePause = () => {
    const { togglePaused } = this.props;

    togglePaused();
  };

  handleCancelJob = (jobId) => () => {
    const { removeJobFromQueueByQueueId } = this.props;

    removeJobFromQueueByQueueId(jobId);
  };

  // TODO: Add more "helper" buttons; shift up and shift down in queue; add padding to sides; add tooltip info on hover
  getJobLayout = (queueEntries) => {
    const { getJobData } = this.props;

    return (
      <Box px={1} className="panelGrid">
        <Grid container overflow="hidden">
          {queueEntries.map((queueEntry, index) => {
            const jobData = getJobData(queueEntry.jobId);
            const jobMessage =
              queueEntry.iterations > 0
                ? `${jobData.name} (x${queueEntry.iterations})`
                : `${jobData.name}`;
            return (
              <Grid
                container
                item
                xs={12}
                key={queueEntry.queueId}
                alignItems="center"
              >
                <Grid item xs={1.5}>
                  <Typography>{`${index + 1}.`}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography>{jobMessage}</Typography>
                </Grid>
                <Grid item xs="auto">
                  <IconButton
                    onClick={this.handleCancelJob(queueEntry.queueId)}
                  >
                    <FontAwesomeIcon icon={faXmarkCircle} />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  render() {
    const { queueEntries, isPaused } = this.props;
    return (
      <div className="panelOutline">
        <Typography variant="h6" align="center" className="title">
          Action Queue
        </Typography>
        {this.getJobLayout(queueEntries)}
        <Button onClick={this.handlePause}>
          {isPaused ? 'Play' : 'Pause'}
        </Button>
      </div>
    );
  }
}

ActionQueuePanel.propTypes = {
  queueEntries: PropTypes.arrayOf(
    PropTypes.shape({
      queueId: PropTypes.string.isRequired,
      jobId: PropTypes.string.isRequired,
      iterations: PropTypes.number.isRequired,
    })
  ).isRequired,
  isPaused: PropTypes.bool.isRequired,

  getJobData: PropTypes.func.isRequired,
  togglePaused: PropTypes.func.isRequired,
  removeJobFromQueueByQueueId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  getJobData: getJobById(state),
  queueEntries: getJobQueue(state),
  isPaused: isGamePaused(state),
});

const mapDispatchToProps = {
  togglePaused: gameActions.togglePaused,
  removeJobFromQueueByQueueId: gameActions.removeJobFromQueueByQueueId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionQueuePanel);
