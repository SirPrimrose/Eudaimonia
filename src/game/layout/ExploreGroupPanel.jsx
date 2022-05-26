import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Tooltip, Typography } from '@mui/material';
import ProgressBarWithOverlay from '../../shared/ProgressBarWithOverlay';
import { getProgressValue } from '../../shared/util';
import { getExploreGroups, getWorldResources } from '../../slice/gameSlice';

class ExploreGroupPanel extends React.PureComponent {
  renderGridItemContent = (exploreGroup) => (
    <Tooltip title={`Explored a total of ${exploreGroup.permExploration}`}>
      <div>
        <ProgressBarWithOverlay
          value={getProgressValue(
            exploreGroup.currentExploration,
            exploreGroup.maxExploration
          )}
        >
          {`${getProgressValue(
            exploreGroup.permExplorationScaled,
            exploreGroup.maxExploration
          ).toFixed(2)}%`}
        </ProgressBarWithOverlay>
      </div>
    </Tooltip>
  );

  getExploreGroupLayout = (exploreGroups) => (
    <div className="panelGrid">
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        rowSpacing={1}
      >
        {Object.entries(exploreGroups).map(
          ([exploreGroupName, exploreGroup]) => (
            <Fragment key={exploreGroupName}>
              <Grid item xs={12}>
                {this.renderGridItemContent(exploreGroup)}
              </Grid>
            </Fragment>
          )
        )}
      </Grid>
    </div>
  );

  render() {
    const { exploreGroups } = this.props;

    return (
      <div className="panelOutline">
        <Typography variant="h6" align="center" className="title">
          Discovery
        </Typography>
        {this.getExploreGroupLayout(exploreGroups)}
      </div>
    );
  }
}

ExploreGroupPanel.propTypes = {
  exploreGroups: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      currentExploration: PropTypes.number.isRequired,
      permExploration: PropTypes.number.isRequired,
      permExplorationScaled: PropTypes.number.isRequired,
      maxExploration: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  exploreGroups: getExploreGroups(state),
});

export default connect(mapStateToProps)(ExploreGroupPanel);
