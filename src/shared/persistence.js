/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { initialState } from '../slice/gameLogic';

const SAVE_DATA_KEY = 'saveData';

const savePropsFromData = (propsToSave, data) =>
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
    jobs: savePropsFromData(['currentXp'], gameState.jobs),
    skills: savePropsFromData(
      ['currentXp', 'permXp', 'currentLevel', 'permLevel'],
      gameState.skills
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
