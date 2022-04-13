import { Stack } from '@mui/material';
import React from 'react';

class InventoryPanel extends React.PureComponent {
  render() {
    return (
      <Stack spacing={20}>
        <div>Local Inv</div>
        <div>Stored Inv</div>
      </Stack>
    );
  }
}

export default InventoryPanel;
