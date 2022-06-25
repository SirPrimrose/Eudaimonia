/* eslint-disable no-param-reassign */
import { initialState } from './initialGameState';

// JOB QUEUE
const resetQueueTick = (state) => {
  state.tickRemaining = 1;
};

const cleanupJobQueue = (state) => {
  let lastSeen;
  state.queue = state.queue.reduce((newQueue, currentEntry) => {
    if (lastSeen && lastSeen.jobId === currentEntry.jobId) {
      lastSeen.iterations += currentEntry.iterations;
    } else {
      newQueue.push(currentEntry);
    }
    lastSeen = currentEntry;
    return newQueue;
  }, []);
};

const removeJobFromQueueByQueueId = (state, queueId) => {
  state.queue = state.queue.filter((j) => j.queueId !== queueId);
  cleanupJobQueue(state);
};

const removeJobFromQueueByJobId = (state, jobId) => {
  state.queue = state.queue.filter((j) => j.id !== jobId);
  cleanupJobQueue(state);
};

const pushJobToQueue = (state, queueEntry) => {
  state.queue.push(queueEntry);
  cleanupJobQueue(state);
};

const unshiftJobToQueue = (state, queueEntry) => {
  state.queue.unshift(queueEntry);
  cleanupJobQueue(state);
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
