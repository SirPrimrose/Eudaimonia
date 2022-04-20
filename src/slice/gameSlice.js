/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { PHASES } from '../game/consts';
import gameLoopThunk from './gameLoopThunk';

const initialState = {
  phase: PHASES.PREP,
  ticking: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPhase: (state, action) => {
      state.phase = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gameLoopThunk.runGameLoop.pending, (state) => {
      state.ticking = true;
    });
    builder.addCase(gameLoopThunk.runGameLoop.fulfilled, (state) => {
      state.ticking = false;
    });
  },
});

export const isGameTicking = (store) => store.game.ticking;
export const getGamePhase = (store) => store.game.phase;

export const { actions } = gameSlice;

export default gameSlice.reducer;
