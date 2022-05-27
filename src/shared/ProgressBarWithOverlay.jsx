import React from 'react';
import { Box, Grid, LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';

class ProgressBarWithOverlay extends React.PureComponent {
  render() {
    const { value, sx, children } = this.props;

    return (
      <Grid container spacing={1} justify="space-between">
        <Grid item xs={12} style={{ position: 'relative' }}>
          <Box
            style={{
              inset: 0,
              zIndex: 1,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              style={{
                paddingTop: '8px',
                paddingLeft: '8px',
                width: '100%',
                textAlign: 'center',
                /* TODO: Fix clipping from interfering with icons
                  background:
                    'linear-gradient(to right, white var(--p,50%), black 0)',
                  backgroundPositionX: '4px',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  '--p': `${value}%`, */
              }}
            >
              {children}
            </Box>
          </Box>
          <LinearProgress
            className="pb-fast-transition"
            variant="determinate"
            sx={sx}
            value={value}
          />
        </Grid>
      </Grid>
    );
  }
}

ProgressBarWithOverlay.propTypes = {
  value: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
  children: PropTypes.node,
};

ProgressBarWithOverlay.defaultProps = {
  children: null,
  sx: { height: 24 },
};

export default ProgressBarWithOverlay;
