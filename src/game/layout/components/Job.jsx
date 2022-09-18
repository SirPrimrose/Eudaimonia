import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { getProgressValue } from '../../../shared/util';
import {
  actions as gameActions,
  getInventory,
  getMsForSkillXp,
} from '../../../slice/gameSlice';
import { createJobQueueEntry } from '../../data/jobConstructor';
import { getIconForSkillType } from './Icons';
import { toGameNumber, toTimeLength } from '../../format';
import { COMPLETION_TYPE } from '../../data/jobs';

class Job extends React.PureComponent {
  constructor(props) {
    super(props);
    const { maxXpMs, currentXpMs, job } = this.props;

    const currentMsLeft = maxXpMs - currentXpMs;
    const itemsRequired = job.completionEvents
      .filter((e) => e.type === COMPLETION_TYPE.CONSUME_ITEM)
      .reduce((itemObj, e) => {
        const amountUsed = job.usedItems[e.value.item] || 0;
        return { ...itemObj, [e.value.itemId]: e.value.amount - amountUsed };
      }, {});

    this.state = {
      jobTooltip: this.getJobTooltip(maxXpMs, currentMsLeft, itemsRequired),
    };
  }

  componentDidUpdate(prevProps) {
    const { maxXpMs, currentXpMs, job, inventory } = this.props;
    if (job !== prevProps.job) {
      const currentMsLeft = maxXpMs - currentXpMs;
      const itemsRequired = job.completionEvents
        .filter((e) => e.type === COMPLETION_TYPE.CONSUME_ITEM)
        .reduce((itemObj, e) => {
          const item = inventory[e.value.itemId];
          const amountUsed = job.usedItems[e.value.itemId] || 0;
          return { ...itemObj, [item.name]: e.value.amount - amountUsed };
        }, {});

      this.setState(() => ({
        jobTooltip: this.getJobTooltip(maxXpMs, currentMsLeft, itemsRequired),
      }));
    }
  }

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
        Click to queue
      </Typography>
      <Typography variant="body2" fontSize={12}>
        Right Click for 1x
      </Typography>
    </Stack>
  );

  getJobTooltip = (maxMs, currentMsLeft, itemsRequired) => {
    const {
      job: { description, maxXp },
    } = this.props;

    return (
      <Stack
        direction="column"
        alignItems="center"
        divider={<Divider orientation="horizontal" flexItem light />}
        spacing={1}
      >
        <Typography variant="body1" textAlign="center">
          {description}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
        >
          <Typography variant="body1">{`${toTimeLength(
            currentMsLeft
          )} / ${toTimeLength(maxMs)}`}</Typography>
          <Typography variant="body1">{`${maxXp} XP`}</Typography>
        </Stack>
        {Object.keys(itemsRequired).length > 0 && (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={2}
                  sx={{ border: 0, padding: 0 }}
                >
                  <Typography
                    variant="body2"
                    color="primary.contrastText"
                    fontWeight="bold"
                  >
                    Requirements
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(itemsRequired).map(([itemName, amount]) => (
                <TableRow key={itemName}>
                  <TableCell sx={{ border: 0, paddingX: 2, paddingY: 0 }}>
                    <Typography variant="body2" color="primary.contrastText">
                      {itemName}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: 0, padding: 0 }}>
                    <Typography variant="body2" color="primary.contrastText">
                      {toGameNumber(amount)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Stack
          direction="row"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
        >
          <Typography variant="body2" fontSize={12}>
            Click to do now
          </Typography>
          <Typography variant="body2" fontSize={12}>
            Right Click for 1x
          </Typography>
        </Stack>
      </Stack>
    );
  };

  render() {
    const {
      job: { id, name, currentXp, maxXp, skill },
    } = this.props;
    const { jobTooltip } = this.state;

    return (
      <Stack
        direction="row"
        alignItems="stretch"
        justifyContent="flex-start"
        position="relative"
      >
        <Tooltip title={jobTooltip} disableInteractive>
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
        </Tooltip>
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
  // TODO: Iterative change to remove function from mapStateToProps; replace with individual component to not require keeping reference to all items
  inventory: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    skill: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    currentXp: PropTypes.number.isRequired,
    maxXp: PropTypes.number.isRequired,
    completionEvents: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        value: PropTypes.object.isRequired,
      })
    ),
    usedItems: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  // Time already spent doing job, scaled to current xp rate
  maxXpMs: PropTypes.number.isRequired,
  // Time to complete job, scaled to current xp rate
  currentXpMs: PropTypes.number.isRequired,

  // Dispatch functions
  pushJobToQueue: PropTypes.func.isRequired,
  unshiftJobToQueue: PropTypes.func.isRequired,
  setPaused: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { job } = ownProps;

  return {
    maxXpMs: getMsForSkillXp(state, job.skill, job.maxXp),
    currentXpMs: getMsForSkillXp(state, job.skill, job.currentXp),
    inventory: getInventory(state),
  };
};

const mapDispatchToProps = {
  pushJobToQueue: gameActions.pushJobToQueue,
  unshiftJobToQueue: gameActions.unshiftJobToQueue,
  setPaused: gameActions.setPaused,
};

export default connect(mapStateToProps, mapDispatchToProps)(Job);
