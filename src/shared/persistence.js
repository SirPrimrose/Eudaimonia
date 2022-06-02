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
    phase: gameState.phase,
    isPaused: gameState.isPaused,
    currentJobs: gameState.currentJobs,
    tickRemaining: gameState.tickRemaining,
    queue: gameState.queue,
    messages: gameState.messages,
    items: savePropsFromObjectMap(
      [
        'currentExploration',
        'permExploration',
        'currentLevel',
        'currentCooldown',
        'active',
      ],
      gameState.items
    ),
    worldResources: savePropsFromObjectMap(
      ['currentResource', 'checkedPotency', 'unlockedResource'],
      gameState.worldResources
    ),
    exploreGroups: savePropsFromObjectMap(
      ['currentExploration', 'permExploration'],
      gameState.exploreGroups
    ),
    jobs: savePropsFromObjectMap(['currentXp'], gameState.jobs),
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

export const saveLocalState = (state) => {
  try {
    const serializedState = exportSaveData(state.game);
    localStorage.setItem(SAVE_DATA_KEY, serializedState);
  } catch {
    // ignore write errors
  }
};
