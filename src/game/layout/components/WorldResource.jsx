import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { getProgressValue } from '../../../shared/util';
import ProgressBarWithOverlay from '../../../shared/ProgressBarWithOverlay';

class WorldResource extends React.PureComponent {
  getTooltipValue = (name, potencyPerUnlock, untilNextUnlock) => (
    <Stack alignItems="center">
      <Typography variant="body2">{`Gain ${1} ${name} every ${potencyPerUnlock} checked.`}</Typography>
      <Typography variant="body2">{`${untilNextUnlock} left for next unlock.`}</Typography>
    </Stack>
  );

  render() {
    const {
      worldResource: {
        name,
        potencyPerUnlock,
        usedResource,
        unlockedResource,
        maxPotency,
        checkedPotency,
      },
    } = this.props;
    const untilNextUnlock =
      potencyPerUnlock - (checkedPotency % potencyPerUnlock);
    const remainingResource = unlockedResource - usedResource;

    // TODO: Add icons instead of text to represent "checked", etc.
    return (
      <Grid item xs={12}>
        <Tooltip
          title={this.getTooltipValue(name, potencyPerUnlock, untilNextUnlock)}
          disableInteractive
        >
          <Box>
            <ProgressBarWithOverlay
              value={getProgressValue(remainingResource, unlockedResource)}
            >
              <Typography color="primary.contrastText">
                {`${remainingResource}/${unlockedResource} ${name} - ${
                  maxPotency - checkedPotency
                } Unchecked`}
              </Typography>
            </ProgressBarWithOverlay>
          </Box>
        </Tooltip>
      </Grid>
    );
  }
}

WorldResource.propTypes = {
  worldResource: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    potencyPerUnlock: PropTypes.number.isRequired,
    usedResource: PropTypes.number.isRequired,
    unlockedResource: PropTypes.number.isRequired,
    checkedPotency: PropTypes.number.isRequired,
    maxPotency: PropTypes.number.isRequired,
  }).isRequired,
};

export default WorldResource;
