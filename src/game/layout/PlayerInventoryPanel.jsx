import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Stack, Typography } from '@mui/material';
import PlayerItem from './components/PlayerItem';
import { getInventory } from '../../slice/gameSlice';

class PlayerInventoryPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    const { inventory } = this.props;

    this.state = {
      activeInventory: this.getActiveInventory(inventory),
    };
  }

  componentDidUpdate(prevProps) {
    const { inventory } = this.props;
    if (inventory !== prevProps.inventory) {
      this.setState(() => ({
        activeInventory: this.getActiveInventory(inventory),
      }));
    }
  }

  getActiveInventory = (inventory) =>
    Object.values(inventory).filter((i) => i.isActive);

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
    const { activeInventory } = this.state;
    return (
      <div className="panelOutline">
        <Typography variant="h6" align="center" className="title">
          Inventory
        </Typography>
        {this.getInventoryLayout(activeInventory)}
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
  inventory: getInventory(state),
});

export default connect(mapStateToProps)(PlayerInventoryPanel);
