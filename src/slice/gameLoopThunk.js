import { createAsyncThunk, current } from '@reduxjs/toolkit';
import { actions as textLogActions } from './textLogSlice';
import { actions as jobActions, getFirstJobInQueue } from './jobSlice';
import { createJobQueueEntry } from '../game/jobConstructor';
import { JOB_NAMES } from '../game/jobs';

const runGameLoop = createAsyncThunk(
  'gameLoop',
  async (payload, { dispatch, getState }) => {
    console.log('Starting tick');

    // Tick current job
    const currentJob = getFirstJobInQueue(getState());
    console.log(currentJob);
    if (currentJob) {
      dispatch(jobActions.addXpToJob({ xp: 1, name: currentJob.name }));
      dispatch(
        textLogActions.addMessage(
          `${currentJob.name} now has ${
            getState().jobs.jobs[currentJob.name].currentXp
          } xp`
        )
      );
    }

    // simulate intense calculations
    await new Promise((resolve) =>
      // eslint-disable-next-line no-promise-executor-return
      setTimeout(resolve, Math.random() * 1000 + 1000)
    );
  }
);

export default { runGameLoop };
