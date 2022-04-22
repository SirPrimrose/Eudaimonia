/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { JOB_BASES } from '../game/data/jobs';
import { getProgressValue } from '../shared/util';

// Initially loads JOB_BASES into state
const initialState = {
  tickRemaining: 1,
  jobs: JOB_BASES,
  queue: [],
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

export const getFirstJobInQueue = (store) => store.jobs.queue.find(() => true);

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
