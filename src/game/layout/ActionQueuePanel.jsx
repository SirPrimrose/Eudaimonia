import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@mui/material';
import { getJobQueue } from '../../slice/jobQueueSlice';

class ActionQueuePanel extends React.PureComponent {
  getJobLayout = (jobs) =>
    jobs.map((job, index) => (
      <Typography className="job" key={job.id}>
        {`${index + 1}. ${job.name}`}
      </Typography>
    ));

  render() {
    const { jobs } = this.props;
    return (
      <div className="actionQueue">
        <Typography className="title">Action Queue</Typography>
        <div className="jobLayout">{this.getJobLayout(jobs)}</div>
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
  ),
};

ActionQueuePanel.defaultProps = {
  jobs: [],
};

const mapStateToProps = (state) => ({
  jobs: getJobQueue(state),
});

export default connect(mapStateToProps)(ActionQueuePanel);
