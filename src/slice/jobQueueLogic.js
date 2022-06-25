/* eslint-disable no-param-reassign */
import { initialState } from './initialGameState';

// JOB QUEUE
const resetQueueTick = (state) => {
  state.tickRemaining = 1;
};

const removeJobFromQueueByQueueId = (state, queueId) => {
  state.queue = state.queue.filter((j) => j.queueId !== queueId);
};

const removeJobFromQueueByJobId = (state, jobId) => {
  state.queue = state.queue.filter((j) => j.id !== jobId);
};

const pushJobToQueue = (state, queueEntry) => {
  state.queue.push(queueEntry);
};

const unshiftJobToQueue = (state, queueEntry) => {
  state.queue.unshift(queueEntry);
};

const resetjobQueue = (state) => {
  state.queue = initialState.queue;
};

const shouldTickJobQueue = (state) =>
  state.tickRemaining > 0 && state.queue.length > 0;

const getFirstQueueEntry = (state) => state.queue.find(() => true);

export {
  resetQueueTick,
  removeJobFromQueueByQueueId,
  removeJobFromQueueByJobId,
  pushJobToQueue,
  unshiftJobToQueue,
  resetjobQueue,
  shouldTickJobQueue,
  getFirstQueueEntry,
};
