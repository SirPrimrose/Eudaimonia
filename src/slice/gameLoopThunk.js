import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions as textLogActions } from './textLogSlice';
import { actions as statsActions } from './statsSlice';
import { actions as skillActions, getSkillByName } from './skillSlice';
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
import { actions as exploreGroupActions } from './exploreGroupSlice';

const performJobCompletionEvent = (dispatch, getState, job, event) => {
  switch (event.type) {
    case COMPLETION_TYPE.UNLOCK_JOB:
      dispatch(gameActions.addToCurrentJobs(event.value));
      break;
    case COMPLETION_TYPE.LOCK_JOB:
      dispatch(gameActions.removeFromCurrentJobs(event.value));
      break;
    case COMPLETION_TYPE.HIDE_SELF:
      dispatch(gameActions.removeFromCurrentJobs(job.name));
      break;
    case COMPLETION_TYPE.EXPLORE_AREA:
      dispatch(
        exploreGroupActions.addProgressToExploreGroup({
          name: event.value,
          exploreAmount: event.exploreAmount,
        })
      );
      break;
    default:
      // eslint-disable-next-line no-console
      console.error('No default case for event');
      break;
  }
};

const getXpForTick = (getState, skillName) => {
  const baseXpPerTick = GAME_TICK_TIME / 1000;
  const skillObj = getSkillByName(getState())(skillName);
  return baseXpPerTick * skillObj.xpScaling;
};

const tickJobQueue = (dispatch, getState) => {
  dispatch(jobActions.resetQueueTick());

  while (shouldTickJobQueue(getState())) {
    const currentJob = getFirstJobInQueue(getState());

    if (currentJob) {
      // TODO: Add conditional check for requirements before ticking job
      // 1. Is job in current list of jobs that can be done
      // 2. Do I have the item requirements for the job (requires inventory set up); includes if the player already has the maximum of the given items
      // 3. Am I already max exploration for this (if explore area type)
      dispatch(
        jobActions.tickXpToJob({
          xp: getXpForTick(getState, currentJob.skill),
          name: currentJob.name,
        })
      );
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
        currentJob.completionEvents.forEach((event) => {
          performJobCompletionEvent(dispatch, getState, currentJob, event);
        });
        dispatch(jobActions.resetJobXp(currentJob.name));
        // TODO: Remove this "removeJob" action once requirements are implemented
        if (true) {
          dispatch(jobActions.removeJobFromQueueById(currentJob.queueId));
        }
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
