import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Button, Grid, Typography } from '@mui/material';
import {
  actions as gameActions,
  getJobQueue,
  isGamePaused,
} from '../../slice/gameSlice';
import ActionQueueJobEntry from './components/ActionQueueJobEntry';

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
  getJobLayout = (queueEntries) => (
    <Box px={1} className="panelGrid">
      <Grid container overflow="hidden">
        {queueEntries.map((queueEntry, index) => (
          <ActionQueueJobEntry
            handleCancelJob={this.handleCancelJob}
            queueEntryIndex={index}
            queueEntry={queueEntry}
          />
        ))}
      </Grid>
    </Box>
  );

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

  togglePaused: PropTypes.func.isRequired,
  removeJobFromQueueByQueueId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  queueEntries: getJobQueue(state),
  isPaused: isGamePaused(state),
});

const mapDispatchToProps = {
  togglePaused: gameActions.togglePaused,
  removeJobFromQueueByQueueId: gameActions.removeJobFromQueueByQueueId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionQueuePanel);
