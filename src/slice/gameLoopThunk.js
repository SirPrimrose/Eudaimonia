import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions as textLogActions } from './textLogSlice';
import { actions as statsActions } from './statsSlice';
import { actions as skillActions } from './skillSlice';
import {
  actions as jobActions,
  getFirstJobInQueue,
  getTickRemaining,
  getXpAdded,
  isJobComplete,
  shouldTickJobQueue,
} from './jobSlice';
import { GAME_LOOP_THUNK, GAME_TICK_TIME } from '../shared/consts';
import { actions as gameActions, getGameTime, isGamePaused } from './gameSlice';
import { STAT_NAMES } from '../game/data/stats';
import { COMPLETION_TYPE } from '../game/data/jobs';

const performJobCompletionEvent = (dispatch, getState, event) => {
  switch (event.type) {
    case COMPLETION_TYPE.UNLOCK_JOB:
      dispatch(gameActions.addToCurrentJobs(event.value));
      break;
    case COMPLETION_TYPE.LOCK_JOB:
      dispatch(gameActions.removeFromCurrentJobs(event.value));
      break;
    default:
      // eslint-disable-next-line no-console
      console.error('No default case for event');
      break;
  }
};

const tickJobQueue = (dispatch, getState) => {
  dispatch(jobActions.resetQueueTick());

  while (shouldTickJobQueue(getState())) {
    const currentJob = getFirstJobInQueue(getState());

    if (currentJob) {
      dispatch(jobActions.tickXpToJob({ xp: 0.01, name: currentJob.name }));
      const xpAdded = getXpAdded(getState());
      dispatch(
        skillActions.addXpToSkill({ xp: xpAdded, name: currentJob.skill })
      );
      dispatch(
        textLogActions.addMessage(
          `${currentJob.name} gained ${xpAdded} xp and now has ${
            getState().jobs.jobs[currentJob.name].currentXp
          } xp`
        )
      );

      // If job is complete, perform "completionEvents" according to job
      if (isJobComplete(getState())(currentJob.name)) {
        // Loop through completion events
        currentJob.completionEvents.forEach((event) => {
          performJobCompletionEvent(dispatch, getState, event);
        });
        dispatch(jobActions.removeJobFromQueueById(currentJob.id));
      }
    }
  }
  return getTickRemaining(getState());
};

const shouldGamePause = (getState) => !getFirstJobInQueue(getState());

const runGameLoop = createAsyncThunk(
  GAME_LOOP_THUNK,
  async (payload, { dispatch, getState }) => {
    if (!isGamePaused(getState())) {
      if (shouldGamePause(getState)) {
        dispatch(gameActions.setPaused(true));
      } else {
        const tickRem = tickJobQueue(dispatch, getState);
        const jobTime = GAME_TICK_TIME * (1 - tickRem);

        dispatch(
          statsActions.decayStat({
            name: STAT_NAMES.PREP_TIME,
            currentTimeMs: getGameTime(getState()),
            decayTimeMs: jobTime,
          })
        );

        dispatch(gameActions.addGameTime(jobTime));
      }
    }

    // simulate intense calculations
    /* await new Promise((resolve) =>
      // eslint-disable-next-line no-promise-executor-return
      setTimeout(resolve, Math.random() * 1000 + 1000)
    ); */
  }
);

export default { runGameLoop };
