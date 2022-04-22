import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { getJobQueue } from '../../slice/jobSlice';
import { actions as gameActions, isGamePaused } from '../../slice/gameSlice';

class ActionQueuePanel extends React.PureComponent {
  handlePause = () => {
    const { togglePaused } = this.props;

    togglePaused();
  };

  getJobLayout = (jobs) =>
    jobs.map((job, index) => (
      <Typography className="job" key={job.id}>
        {`${index + 1}. ${job.name}`}
      </Typography>
    ));

  render() {
    const { jobs, isPaused } = this.props;
    return (
      <div className="actionQueue">
        <Typography className="title">Action Queue</Typography>
        <div className="jobLayout">{this.getJobLayout(jobs)}</div>
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
};

const mapStateToProps = (state) => ({
  jobs: getJobQueue(state),
  isPaused: isGamePaused(state),
});

const mapDispatchToProps = {
  togglePaused: gameActions.togglePaused,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionQueuePanel);
