import { configureStore } from '@reduxjs/toolkit';
import game from './slice/gameSlice';
import theme from './slice/themeSlice';

export default configureStore({
  reducer: {
    game,
    theme,
  },
});
