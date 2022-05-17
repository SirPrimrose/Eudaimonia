import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Tooltip, Typography } from '@mui/material';
import ProgressBarWithOverlay from '../../shared/ProgressBarWithOverlay';
import { getProgressValue } from '../../shared/util';
import { getWorldResources } from '../../slice/exploreGroupSlice';

class WorldResourcePanel extends React.PureComponent {
  renderGridItemContent = (worldResourceName, worldResource) => (
    <Tooltip
      title={`Gain ${1} ${worldResourceName} every ${
        worldResource.potencyPerUnlock
      } checked`}
    >
      <div>
        <ProgressBarWithOverlay
          value={getProgressValue(
            worldResource.currentResource,
            worldResource.unlockedResource
          )}
        >
          {`${worldResource.currentResource}/${
            worldResource.unlockedResource
          } ${worldResourceName} - ${
            worldResource.maxPotency - worldResource.checkedPotency
          } Unchecked`}
        </ProgressBarWithOverlay>
      </div>
    </Tooltip>
  );

  getWorldResourceLayout = (worldResources) => (
    <div className="panelGrid">
      <Grid container alignItems="center" justifyContent="space-between">
        {Object.entries(worldResources).map(
          ([worldResourceName, worldResource]) => (
            <Fragment key={worldResourceName}>
              <Grid item xs={12}>
                {this.renderGridItemContent(worldResourceName, worldResource)}
              </Grid>
            </Fragment>
          )
        )}
      </Grid>
    </div>
  );

  render() {
    const { worldResources } = this.props;

    return (
      <div className="panelOutline">
        <Typography variant="h6" align="center" className="title">
          World
        </Typography>
        {this.getWorldResourceLayout(worldResources)}
      </div>
    );
  }
}

WorldResourcePanel.propTypes = {
  worldResources: PropTypes.objectOf(
    PropTypes.shape({
      potencyPerUnlock: PropTypes.number.isRequired,
      currentResource: PropTypes.number.isRequired,
      unlockedResource: PropTypes.number.isRequired,
      checkedPotency: PropTypes.number.isRequired,
      maxPotency: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  worldResources: getWorldResources(state),
});

export default connect(mapStateToProps)(WorldResourcePanel);
