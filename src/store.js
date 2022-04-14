import { configureStore } from '@reduxjs/toolkit';
import textLogReducer from './slice/textLogSlice';

export default configureStore({
  reducer: {
    textLog: textLogReducer,
  },
});
