import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { actions as jobActions, getJobQueue } from '../../slice/jobSlice';
import { actions as gameActions, isGamePaused } from '../../slice/gameSlice';

class ActionQueuePanel extends React.PureComponent {
  handlePause = () => {
    const { togglePaused } = this.props;

    togglePaused();
  };

  handleCancelJob = (jobId) => () => {
    const { removeJobFromQueueById } = this.props;

    removeJobFromQueueById(jobId);
  };

  getJobLayout = (jobs) => (
    <Stack className="jobLayout">
      {jobs.map((job, index) => (
        <Grid
          container
          key={job.id}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={2}>
            <Typography className="job">{`${index + 1}.`}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="job">{`${job.name}`}</Typography>
          </Grid>
          <Grid item xs="auto">
            <IconButton onClick={this.handleCancelJob(job.id)}>
              <FontAwesomeIcon icon={faXmarkCircle} />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Stack>
  );

  render() {
    const { jobs, isPaused } = this.props;
    return (
      <div className="actionQueue">
        <Typography className="title">Action Queue</Typography>
        {this.getJobLayout(jobs)}
        <Button onClick={this.handlePause}>
          {isPaused ? 'Play' : 'Pause'}
        </Button>
      </div>
    );
  }
}

ActionQueuePanel.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  isPaused: PropTypes.bool.isRequired,
  togglePaused: PropTypes.func.isRequired,
  removeJobFromQueueById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: getJobQueue(state),
  isPaused: isGamePaused(state),
});

const mapDispatchToProps = {
  togglePaused: gameActions.togglePaused,
  removeJobFromQueueById: jobActions.removeJobFromQueueById,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionQueuePanel);
