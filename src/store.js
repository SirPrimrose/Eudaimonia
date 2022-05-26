import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slice/gameSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
