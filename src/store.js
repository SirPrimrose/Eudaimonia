import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slice/gameSlice';
import statsReducer from './slice/statsSlice';
import textLogReducer from './slice/textLogSlice';
import jobReducer from './slice/jobSlice';
import skillReducer from './slice/skillSlice';
import inventoryReducer from './slice/inventorySlice';

export default configureStore({
  reducer: {
    game: gameReducer,
    stats: statsReducer,
    skill: skillReducer,
    textLog: textLogReducer,
    jobs: jobReducer,
    inventory: inventoryReducer,
  },
});
