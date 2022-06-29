import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getJobs } from '../../../../slice/gameSlice';
import JobActions from '../JobActions';
import { JOB_CATEGORY } from '../../../data/jobs';
import WorldResourcePanel from '../../WorldResourcePanel';
import ExploreGroupPanel from '../../ExploreGroupPanel';

class JobsPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeJobs: this.getActiveJobsFromJobs(props.jobs),
    };
  }

  componentDidUpdate(prevProps) {
    const { jobs } = this.props;
    if (jobs !== prevProps.jobs) {
      this.setState(() => ({
        activeJobs: this.getActiveJobsFromJobs(jobs),
      }));
    }
  }

  getActiveJobsFromJobs = (jobs) => {
    const activeJobs = Object.values(JOB_CATEGORY).reduce(
      (catJobs, category) => ({
        ...catJobs,
        [category]: Object.values(jobs).filter(
          (job) => job.isActive && job.category === category
        ),
      }),
      {}
    );
    return activeJobs;
  };

  renderJobCategory = (activeJobs, category) => {
    const activeJobsInCategory = activeJobs[category] || [];
    if (activeJobsInCategory && activeJobsInCategory.length > 0) {
      return (
        <Box className="panelOutline">
          <Typography variant="h5" align="center">
            {category}
          </Typography>
          <Box className="panelGrid">
            <JobActions availableJobs={activeJobsInCategory} />
          </Box>
        </Box>
      );
    }
    return <Box className="flexContainer" />;
  };

  render() {
    const { activeJobs } = this.state;

    return (
      <Grid container columnSpacing={2} px={2} py={1} sx={{ height: '100%' }}>
        <Grid container item direction="column" xs={4}>
          <Grid item xs={8} overflow="hidden">
            {this.renderJobCategory(activeJobs, JOB_CATEGORY.ACTION)}
          </Grid>
          <Grid item xs={4} overflow="hidden">
            <WorldResourcePanel />
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={4}>
          <Grid item xs={8} overflow="hidden">
            {this.renderJobCategory(activeJobs, JOB_CATEGORY.CRAFT)}
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={4}>
          <Grid item xs={8} overflow="hidden">
            <Stack>
              {this.renderJobCategory(activeJobs, JOB_CATEGORY.EXPLORATION)}
              {this.renderJobCategory(activeJobs, JOB_CATEGORY.PROGRESSION)}
            </Stack>
          </Grid>
          <Grid item xs={4} overflow="hidden">
            <ExploreGroupPanel />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

JobsPanel.propTypes = {
  jobs: PropTypes.objectOf(
    PropTypes.shape({
      isActive: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  jobs: getJobs(state),
});

export default connect(mapStateToProps)(JobsPanel);
