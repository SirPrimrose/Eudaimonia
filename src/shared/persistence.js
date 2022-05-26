/* eslint-disable no-param-reassign */
const SAVE_DATA_KEY = 'saveData';

export const loadLocalState = () => {
  try {
    const serializedState = localStorage.getItem(SAVE_DATA_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveLocalState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(SAVE_DATA_KEY, serializedState);
  } catch {
    // ignore write errors
  }
};
