/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { JOB_BASES } from '../game/jobs';
import { getProgressValue } from '../shared/util';

// Initially loads JOB_BASES into state
const initialState = {
  jobs: JOB_BASES,
  queue: [],
};

export const jobSlice = createSlice({
  name: 'jobQueue',
  initialState,
  reducers: {
    addXpToJob: (state, action) => {
      const { xp, name } = action.payload;
      const job = state.jobs[name];
      job.currentXp = Math.min(job.currentXp + xp, job.maxXp);
    },
    addJobToQueue: (state, action) => {
      state.queue.push(action.payload);
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

export const getJobQueue = (store) => store.jobs.queue;

export const { actions } = jobSlice;

export default jobSlice.reducer;
