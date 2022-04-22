import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions as textLogActions } from './textLogSlice';
import { actions as statsActions } from './statsSlice';
import {
  actions as jobActions,
  getFirstJobInQueue,
  shouldRemoveFirstJobFromQueue,
  shouldTickJobQueue,
} from './jobSlice';

const tickJobQueue = (dispatch, getState) => {
  // Set full value of tick in state
  dispatch(jobActions.resetQueueTick());
  while (shouldTickJobQueue(getState())) {
    // Tick current job
    let currentJob = getFirstJobInQueue(getState());
    if (currentJob) {
      dispatch(jobActions.tickXpToJob({ xp: 3, name: currentJob.name }));
      dispatch(
        textLogActions.addMessage(
          `${currentJob.name} now has ${
            getState().jobs.jobs[currentJob.name].currentXp
          } xp`
        )
      );
      // Check for job completion to trigger inventory completion actions
      currentJob = getFirstJobInQueue(getState());
      if (shouldRemoveFirstJobFromQueue(getState())) {
        dispatch(jobActions.removeJobFromQueueById(currentJob.id));
      }
    }
  }
};

const runGameLoop = createAsyncThunk(
  'gameLoop',
  async (payload, { dispatch, getState }) => {
    dispatch(statsActions.addWanderlust(1));

    tickJobQueue(dispatch, getState);

    // simulate intense calculations
    await new Promise((resolve) =>
      // eslint-disable-next-line no-promise-executor-return
      setTimeout(resolve, Math.random() * 1000 + 1000)
    );
  }
);

export default { runGameLoop };
