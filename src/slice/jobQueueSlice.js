/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { JOB_BASES } from '../game/jobs';
import { getProgressValue } from '../shared/util';

// Initially loads JOB_BASES into state
const initialState = {
  jobs: JOB_BASES,
  queue: [],
};

export const jobQueueSlice = createSlice({
  name: 'jobQueue',
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.queue.push(action.payload);
    },
    clearJobs: (state) => {
      state.queue = initialState.queue;
    },
  },
});

export const getJobProgress = (store) => (jobName) =>
  getProgressValue(
    store.jobQueue.jobs[jobName].currentXp,
    store.jobQueue.jobs[jobName].maxXp
  );

export const getJobQueue = (store) => store.jobQueue.queue;

export const { actions } = jobQueueSlice;

export default jobQueueSlice.reducer;
