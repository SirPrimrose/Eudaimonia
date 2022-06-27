import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { getProgressValue } from '../../../shared/util';
import { actions as gameActions } from '../../../slice/gameSlice';
import { createJobQueueEntry } from '../../data/jobConstructor';
import { getIconForSkillType } from './Icons';

class Job extends React.PureComponent {
  handlePushJob = (jobId) => () => {
    const { unshiftJobToQueue, setPaused } = this.props;

    unshiftJobToQueue(createJobQueueEntry(jobId));
    setPaused(false);
  };

  handlePushSingleJob = (jobId) => (event) => {
    const { unshiftJobToQueue, setPaused } = this.props;
    event.preventDefault();

    unshiftJobToQueue(createJobQueueEntry(jobId, 1));
    setPaused(false);
  };

  handleQueueJob = (jobId) => () => {
    const { pushJobToQueue, setPaused } = this.props;

    pushJobToQueue(createJobQueueEntry(jobId));
    setPaused(false);
  };

  handleQueueSingleJob = (jobId) => (event) => {
    const { pushJobToQueue, setPaused } = this.props;
    event.preventDefault();

    pushJobToQueue(createJobQueueEntry(jobId, 1));
    setPaused(false);
  };

  getQueueTooltip = () => (
    <Stack
      direction="row"
      alignItems="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
    >
      <Typography variant="body2" fontSize={12}>
        Add to Queue
      </Typography>
      <Typography variant="body2" fontSize={12}>
        Right Click for 1x
      </Typography>
    </Stack>
  );

  render() {
    const {
      job: { id, name, currentXp, maxXp, skill },
    } = this.props;

    return (
      <Stack
        direction="row"
        alignItems="stretch"
        justifyContent="flex-start"
        position="relative"
      >
        <Button
          onClick={this.handlePushJob(id)}
          onContextMenu={this.handlePushSingleJob(id)}
          sx={{ width: '100%', zIndex: 1 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            position="relative"
            width="100%"
            spacing={1}
          >
            {getIconForSkillType(skill)}
            <Typography>{name}</Typography>
          </Stack>
        </Button>
        <Tooltip title={this.getQueueTooltip()} disableInteractive>
          <IconButton
            onClick={this.handleQueueJob(id)}
            onContextMenu={this.handleQueueSingleJob(id)}
            color="primary"
            sx={{
              borderRadius: '0%',
              zIndex: 1,
            }}
          >
            <FontAwesomeIcon icon={faListCheck} />
          </IconButton>
        </Tooltip>
        <LinearProgress
          variant="determinate"
          value={getProgressValue(currentXp, maxXp)}
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}
        />
      </Stack>
    );
  }
}

Job.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    skill: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    currentXp: PropTypes.number.isRequired,
    maxXp: PropTypes.number.isRequired,
  }).isRequired,

  // Dispatch functions
  pushJobToQueue: PropTypes.func.isRequired,
  unshiftJobToQueue: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  pushJobToQueue: gameActions.pushJobToQueue,
  unshiftJobToQueue: gameActions.unshiftJobToQueue,
  setPaused: gameActions.setPaused,
};

export default connect(null, mapDispatchToProps)(Job);
