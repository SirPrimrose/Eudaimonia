/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { getProgressValue } from '../shared/util';
import { xpReqForCurrentLevel } from '../game/data/skills';
import { initialState, runGameLogicLoop, reviveCharacter } from './gameLogic';

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
      state.queue = state.queue.filter((j) => j.queueId !== queueId);
    },
    addJobToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    clearJobsInQueue: (state) => {
      state.queue = initialState.queue;
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
export const getGamePhase = (store) => store.game.phase;
export const getGameTime = (store) => store.game.gameTime;
export const getSoulpowerValue = (store) => store.game.soulpower.resource.value;
export const getCurrentJobs = (store) => store.game.currentJobs;

// INVENTORY
export const getInventory = (store) => Object.values(store.game.items);
export const getActiveInventory = (store) =>
  getInventory(store).filter((i) => i.isActive);

// WORLD
export const getExploreGroups = (store) => store.game.exploreGroups;
export const getWorldResources = (store) => store.game.worldResources;

// JOBS
export const getJobProgress = (store) => (jobId) =>
  getProgressValue(
    store.game.jobs[jobId].currentXp,
    store.game.jobs[jobId].maxXp
  );
export const getJobById = (store) => (jobId) => store.game.jobs[jobId];
export const getJobQueue = (store) => store.game.queue;

// SKILLS
export const getSkills = (store) => Object.values(store.game.skills);
export const getSkillsWithLevels = (store) =>
  getSkills(store).filter((skill) => skill.permLevel > 0 || skill.permXp > 0);

// STATS
export const getStats = (store) => Object.values(store.game.stats);
export const getActiveStats = (store) =>
  getStats(store).filter((stat) => stat.isActive);

// TEXT LOG
export const getTextLogMessages = (store) => store.game.messages;

export const { actions } = gameSlice;

export default gameSlice.reducer;
