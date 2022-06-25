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
        {worldResources.map((worldResource) => (
          <WorldResource key={worldResource.id} worldResource={worldResource} />
        ))}
      </Grid>
    </div>
  );

  render() {
    const { worldResources } = this.props;
    const activeWorldResources = worldResources.filter((wr) => wr.isActive);

    return (
      activeWorldResources.length > 0 && (
        <div className="panelOutline">
          <Typography variant="h6" align="center" className="title">
            World
          </Typography>
          {this.getWorldResourceLayout(activeWorldResources)}
        </div>
      )
    );
  }
}

WorldResourcePanel.propTypes = {
  worldResources: PropTypes.arrayOf(
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
