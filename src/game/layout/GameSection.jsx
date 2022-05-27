import { Paper } from '@mui/material';
import React from 'react';
import PhasePanel from './PhasePanel';

class GameSection extends React.PureComponent {
  render() {
    return (
      <Paper elevation={8} sx={{ height: '100%' }}>
        <PhasePanel />
      </Paper>
    );
  }
}

export default GameSection;
