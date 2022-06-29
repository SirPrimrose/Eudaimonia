/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { getProgressValue } from '../shared/util';
import { xpReqForCurrentLevel } from '../game/data/skills';
import { runGameLogicLoop, reviveCharacter } from './gameLogic';
import { initialState } from './initialGameState';
import {
  pushJobToQueue,
  removeJobFromQueueByQueueId,
  unshiftJobToQueue,
} from './jobQueueLogic';

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // GAME
    runGameLoop: (state) => {
      state.isTicking = true;

      runGameLogicLoop(state, 1);

      state.isTicking = false;
    },
    reviveCharacter: (state) => {
      reviveCharacter(state);
    },
    setPaused: (state, action) => {
      state.isPaused = action.payload;
    },
    togglePaused: (state) => {
      state.isPaused = !state.isPaused;
    },
    resetGame: () => initialState,
    // INVENTORY
    // WORLD
    // JOBS
    removeJobFromQueueByQueueId: (state, { payload: queueId }) => {
      removeJobFromQueueByQueueId(state, queueId);
    },
    pushJobToQueue: (state, { payload: queueEntry }) => {
      pushJobToQueue(state, queueEntry);
    },
    unshiftJobToQueue: (state, { payload: queueEntry }) => {
      unshiftJobToQueue(state, queueEntry);
    },
    // SKILLS
    resetSkillCurrentLevels: (state) => {
      state.skills.map((skill) => ({
        ...skill,
        currentLevel: 0,
        currentXp: 0,
        currentLevelXpReq: xpReqForCurrentLevel(0),
      }));
    },
    // STATS
    addStat: (state, { payload }) => {
      const { statId, value } = payload;
      const stat = state.stats[statId];

      stat.currentValue = Math.min(stat.maxValue, stat.currentValue + value);
    },
    setStat: (state, { payload }) => {
      const { statId, newValue } = payload;

      state.stats[statId].currentValue = newValue;
    },
    // TEXT LOG
    addMessage: (state, action) => {
      state.messages.push({ listId: uuid(), text: action.payload });

      if (state.messages.length >= 25) {
        state.messages.shift();
      }
    },
    clearMessages: (state) => {
      state.messages = initialState.messages;
    },
  },
});

// GAME
export const isGamePaused = (store) => store.game.isPaused;
export const isGameTicking = (store) => store.game.isTicking;
export const getGameException = (store) => store.game.exception;
export const getGamePhase = (store) => store.game.phase;
export const getGameTime = (store) => store.game.gameTime;
export const getSoulpowerValue = (store) => store.game.soulpower.resource.value;

// INVENTORY
export const getInventory = (store) => Object.values(store.game.items);
export const getActiveInventory = (store) =>
  getInventory(store).filter((i) => i.isActive);
export const getItemById = (store) => (itemId) => store.game.items[itemId];

// WORLD
export const getExploreGroups = (store) =>
  Object.values(store.game.exploreGroups);
export const getWorldResources = (store) =>
  Object.values(store.game.worldResources);

// JOBS
export const getJobProgress = (store) => (jobId) =>
  getProgressValue(
    store.game.jobs[jobId].currentXp,
    store.game.jobs[jobId].maxXp
  );
export const getJobs = (store) => Object.values(store.game.jobs);
export const getJobById = (store) => (jobId) => store.game.jobs[jobId];

// QUEUE
export const getJobQueue = (store) => store.game.queue;

// SKILLS
export const getSkills = (store) => store.game.skills;
export const getMsForSkillXp = (store) => (skillId, xp) =>
  (xp / store.game.skills[skillId].xpScaling.value) * 1000;

// STATS
export const getStats = (store) => store.game.stats;

// TEXT LOG
export const getTextLogMessages = (store) => store.game.messages;

export const { actions } = gameSlice;

export default gameSlice.reducer;
