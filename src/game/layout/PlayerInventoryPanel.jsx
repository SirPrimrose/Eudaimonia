import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Stack, Typography } from '@mui/material';
import { getActiveInventory, getInventory } from '../../slice/gameSlice';
import PlayerItem from './components/PlayerItem';

class PlayerInventoryPanel extends React.PureComponent {
  getInventoryLayout = (inventory) => (
    <div className="panelGrid">
      <Stack mx={1}>
        {Object.entries(inventory).map(([itemName, item]) => (
          <PlayerItem key={itemName} item={item} />
        ))}
      </Stack>
    </div>
  );

  render() {
    const { inventory } = this.props;
    return (
      <div className="panelOutline">
        <Typography variant="h6" align="center" className="title">
          Inventory
        </Typography>
        {this.getInventoryLayout(inventory)}
      </div>
    );
  }
}

PlayerInventoryPanel.propTypes = {
  inventory: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      currentAmount: PropTypes.number.isRequired,
      maxAmount: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      healType: PropTypes.string.isRequired,
      healAmount: PropTypes.number.isRequired,
      currentCooldown: PropTypes.number.isRequired,
      maxCooldown: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  inventory: getActiveInventory(state),
});

export default connect(mapStateToProps)(PlayerInventoryPanel);
