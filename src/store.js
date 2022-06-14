import { configureStore } from '@reduxjs/toolkit';
import { throttle } from 'lodash';
import { loadLocalState, saveLocalState } from './game/persistence';
import game from './slice/gameSlice';
import theme from './slice/themeSlice';

const store = configureStore({
  reducer: {
    game,
    theme,
  },
  preloadedState: loadLocalState(),
});

store.subscribe(
  throttle(() => {
    saveLocalState(store.getState());
  }, 1000)
);

export default store;
