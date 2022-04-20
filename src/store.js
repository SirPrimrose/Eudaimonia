import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slice/gameSlice';
import statsReducer from './slice/statsSlice';
import textLogReducer from './slice/textLogSlice';
import jobReducer from './slice/jobSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
    stats: statsReducer,
    textLog: textLogReducer,
    jobs: jobReducer,
  },
});
