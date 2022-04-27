import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions as textLogActions } from './textLogSlice';
import { actions as statsActions } from './statsSlice';
import { actions as skillActions } from './skillSlice';
import {
  actions as jobActions,
  getFirstJobInQueue,
  getTickRemaining,
  getXpAdded,
  shouldRemoveFirstJobFromQueue,
  shouldTickJobQueue,
} from './jobSlice';
import { GAME_LOOP_THUNK, GAME_TICK_TIME } from '../shared/consts';
import { actions as gameActions, getGameTime, isGamePaused } from './gameSlice';
import { STAT_NAMES } from '../game/data/stats';

const tickJobQueue = (dispatch, getState) => {
  // Set full value of tick in state
  dispatch(jobActions.resetQueueTick());
  while (shouldTickJobQueue(getState())) {
    // Tick current job
    let currentJob = getFirstJobInQueue(getState());
    if (currentJob) {
      dispatch(jobActions.tickXpToJob({ xp: 0.35, name: currentJob.name }));
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
      // Check for job completion to trigger inventory completion actions
      currentJob = getFirstJobInQueue(getState());
      if (shouldRemoveFirstJobFromQueue(getState())) {
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
