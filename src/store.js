import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slice/gameSlice';
import textLogReducer from './slice/textLogSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
    textLog: textLogReducer,
  },
});
