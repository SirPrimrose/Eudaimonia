import { Stack } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Job from '../components/Job';

class JobActions extends React.PureComponent {
  renderAvailableJobs = () => {
    const { availableJobs } = this.props;

    // TODO: Render a job in its own component, pass job data to component
    return availableJobs.map((job) => <Job key={job.id} job={job} />);
  };

  render() {
    return <Stack pb={1}>{this.renderAvailableJobs()}</Stack>;
  }
}

JobActions.propTypes = {
  availableJobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      currentXp: PropTypes.number.isRequired,
      maxXp: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default JobActions;
