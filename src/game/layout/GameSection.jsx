import { Paper } from '@mui/material';
import React from 'react';
import JobsPanel from './phases/wander/JobsPanel';

class GameSection extends React.PureComponent {
  render() {
    return (
      <Paper elevation={8} sx={{ height: '100%' }}>
        <JobsPanel />
      </Paper>
    );
  }
}

export default GameSection;
