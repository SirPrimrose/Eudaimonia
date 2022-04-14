/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import PHASES from '../game/consts';

const initialState = {
  phase: PHASES.PREP,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPhase: (state, action) => {
      state.phase = action.payload;
    },
  },
});

export const getGamePhase = (store) => store.game.phase;

export const { actions } = gameSlice;

export default gameSlice.reducer;
