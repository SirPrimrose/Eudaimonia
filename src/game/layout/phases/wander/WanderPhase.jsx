import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentJobs } from '../../../../slice/gameSlice';
import JobActions from '../JobActions';
import { JOB_CATEGORY } from '../../../data/jobs';
import WorldResourcePanel from '../../WorldResourcePanel';

class WanderPhase extends React.PureComponent {
  renderJobCategory = (currentJobs, category) => {
    const jobsInCategory = currentJobs[category];
    if (jobsInCategory.length > 0) {
      return (
        <Box className="panelOutline">
          <Typography variant="h5" align="center">
            {category}
          </Typography>
          <Box className="panelGrid">
            <JobActions availableJobs={jobsInCategory} />
          </Box>
        </Box>
      );
    }
    return <Box className="flexContainer" />;
  };

  render() {
    // TODO: Match design template...
    // "Build" column also contains "Monuments" panel
    // "Recon" column also contains "World Knowledge" panel
    const { currentJobs } = this.props;

    return (
      <Grid container columnSpacing={2} px={2} py={1} sx={{ height: '100%' }}>
        <Grid container item direction="column" xs={4}>
          <Grid item xs={8} overflow="hidden">
            {this.renderJobCategory(currentJobs, JOB_CATEGORY.ACTION)}
          </Grid>
          <Grid item xs={4} overflow="hidden">
            <WorldResourcePanel />
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={4}>
          <Grid item xs={8} overflow="hidden">
            {this.renderJobCategory(currentJobs, JOB_CATEGORY.CRAFT)}
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={4}>
          <Grid item xs={8} overflow="hidden">
            <Stack>
              {this.renderJobCategory(currentJobs, JOB_CATEGORY.EXPLORATION)}
              {this.renderJobCategory(currentJobs, JOB_CATEGORY.PROGRESSION)}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

WanderPhase.propTypes = {
  // Key-value mappings of categories and the jobs in them
  currentJobs: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  currentJobs: getCurrentJobs(state),
});

export default connect(mapStateToProps)(WanderPhase);
