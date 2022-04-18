/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

/**
 * id: Job id
 * name: Job name
 * action: Action the job refers to
 */
const initialState = {
  jobs: [],
};

export const jobQueueSlice = createSlice({
  name: 'jobQueue',
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    clearJobs: (state) => {
      state.jobs = initialState.jobs;
    },
  },
});

export const getJobQueue = (store) => store.jobQueue.jobs;

export const { actions } = jobQueueSlice;

export default jobQueueSlice.reducer;
