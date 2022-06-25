/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { initialState } from '../slice/gameLogic';

const SAVE_DATA_KEY = 'saveData';

const savePropsFromObjectMap = (propsToSave, data) =>
  Object.keys(data).reduce(
    (trimmedObj, j) => ({
      ...trimmedObj,
      [j]: propsToSave.reduce(
        (innerObj, prop) => ({
          ...innerObj,
          [prop]: data[j][prop],
        }),
        {}
      ),
    }),
    {}
  );

const exportSaveData = (gameState) => {
  const saveObj = {
    gameTime: gameState.gameTime,
    soulpower: gameState.soulpower,
    generationCount: gameState.generationCount,
    phase: gameState.phase,
    isPaused: gameState.isPaused,
    tickRemaining: gameState.tickRemaining,
    queue: gameState.queue,
    messages: gameState.messages,
    items: savePropsFromObjectMap(
      ['currentAmount', 'currentCooldown', 'isActive'],
      gameState.items
    ),
    worldResources: savePropsFromObjectMap(
      ['usedResource', 'checkedPotency', 'unlockedResource'],
      gameState.worldResources
    ),
    exploreGroups: savePropsFromObjectMap(
      ['currentExploration', 'permExploration', 'isActive', 'completedUnlocks'],
      gameState.exploreGroups
    ),
    jobs: savePropsFromObjectMap(
      ['currentXp', 'usedItems', 'isActive', 'completions'],
      gameState.jobs
    ),
    skills: savePropsFromObjectMap(
      ['currentXp', 'permXp', 'currentLevel', 'permLevel'],
      gameState.skills
    ),
    stats: savePropsFromObjectMap(
      ['currentValue', 'isActive'],
      gameState.stats
    ),
  };
  return JSON.stringify(saveObj);
};

const importSaveData = (gameState) => ({
  game: _.merge({}, initialState, gameState),
});

export const loadLocalState = () => {
  try {
    const serializedState = localStorage.getItem(SAVE_DATA_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const gameState = JSON.parse(serializedState);
    return importSaveData(gameState);
  } catch (err) {
    return undefined;
  }
};

// TODO: Consider using electron-store or similar library for storage that allows "migration" steps (https://github.com/sindresorhus/electron-store)
export const saveLocalState = (state) => {
  try {
    const serializedState = exportSaveData(state.game);
    localStorage.setItem(SAVE_DATA_KEY, serializedState);
  } catch {
    // ignore write errors
  }
};
