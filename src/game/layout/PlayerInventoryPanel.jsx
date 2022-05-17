import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { getInventory } from '../../slice/inventorySlice';

class PlayerInventoryPanel extends React.PureComponent {
  getInventoryLayout = (inventory) => (
    <div className="panelGrid">
      <Grid container alignItems="center" justifyContent="space-between">
        {Object.entries(inventory).map(([itemName, item]) => (
          <Fragment key={itemName}>
            <Grid item xs={9}>
              <Typography>{`${itemName}`}</Typography>
            </Grid>
            <Grid item xs="auto">
              <Typography>{`${item.currentAmount} / ${item.maxAmount}`}</Typography>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </div>
  );

  render() {
    const { inventory } = this.props;
    return (
      <div className="panelOutline">
        <Typography className="title">Inventory</Typography>
        {this.getInventoryLayout(inventory)}
      </div>
    );
  }
}

PlayerInventoryPanel.propTypes = {
  inventory: PropTypes.objectOf(
    PropTypes.shape({
      currentAmount: PropTypes.number.isRequired,
      maxAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  inventory: getInventory(state),
});

export default connect(mapStateToProps)(PlayerInventoryPanel);
