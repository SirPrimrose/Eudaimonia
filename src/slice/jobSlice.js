/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { JOB_BASES } from '../game/data/jobs';
import { getProgressValue } from '../shared/util';

// Initially loads JOB_BASES into state
const initialState = {
  tickRemaining: 1,
  jobs: JOB_BASES,
  queue: [],
  xpAdded: 0,
};

export const jobSlice = createSlice({
  name: 'jobQueue',
  initialState,
  reducers: {
    resetQueueTick: (state) => {
      state.tickRemaining = initialState.tickRemaining;
    },
    tickXpToJob: (state, action) => {
      const { xp, name } = action.payload;
      const job = state.jobs[name];
      const canAddXp = job.currentXp < job.maxXp;

      // TODO: Rewrite loop to catch edge cases sooner and allow partial xp (tick remaining is not enough for xp, etc.)
      if (canAddXp) {
        const xpToAdd = Math.min(
          job.maxXp - job.currentXp,
          Math.floor(xp * state.tickRemaining)
        );
        if (xpToAdd > 0) {
          state.tickRemaining -= xpToAdd / xp;
        } else {
          state.tickRemaining = 0;
        }
        job.currentXp += xpToAdd;
        state.xpAdded = xpToAdd;
      } else {
        state.xpAdded = 0;
      }
    },
    addJobToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    removeJobFromQueueById: (state, action) => {
      const jobId = action.payload;
      state.queue = state.queue.filter((j) => j.id !== jobId);
    },
    clearJobsInQueue: (state) => {
      state.queue = initialState.queue;
    },
  },
});

export const getJobProgress = (store) => (jobName) =>
  getProgressValue(
    store.jobs.jobs[jobName].currentXp,
    store.jobs.jobs[jobName].maxXp
  );

export const getFirstJobInQueue = (store) => {
  const firstJobRaw = store.jobs.queue.find(() => true);
  if (firstJobRaw) {
    const firstJobData = store.jobs.jobs[firstJobRaw.name];
    return {
      ...firstJobRaw,
      ...firstJobData,
    };
  }
  return null;
};

export const getXpAdded = (store) => store.jobs.xpAdded;

export const shouldRemoveFirstJobFromQueue = (store) => {
  const firstJob = getFirstJobInQueue(store);
  const jobData = store.jobs.jobs[firstJob.name];
  return jobData.currentXp >= jobData.maxXp;
};

export const getJobQueue = (store) => store.jobs.queue;

export const shouldTickJobQueue = (store) =>
  store.jobs.tickRemaining > 0 && getFirstJobInQueue(store);

export const getTickRemaining = (store) => store.jobs.tickRemaining;

export const { actions } = jobSlice;

export default jobSlice.reducer;
