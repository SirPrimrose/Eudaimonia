import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { getWorldResources } from '../../slice/gameSlice';
import WorldResource from './components/WorldResource';

class WorldResourcePanel extends React.PureComponent {
  getWorldResourceLayout = (worldResources) => (
    <div className="panelGrid">
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        rowSpacing={1}
      >
        {Object.entries(worldResources).map(
          ([worldResourceName, worldResource]) => (
            <WorldResource
              key={worldResourceName}
              worldResource={worldResource}
            />
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
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      potencyPerUnlock: PropTypes.number.isRequired,
      usedResource: PropTypes.number.isRequired,
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
