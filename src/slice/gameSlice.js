/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { GAME_LOOP_THUNK, PHASES } from '../shared/consts';

const initialState = {
  gameTime: 0,
  phase: PHASES.PREP,
  isTicking: false,
  isPaused: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPhase: (state, action) => {
      state.phase = action.payload;
    },
    setPaused: (state, action) => {
      state.isPaused = action.payload;
    },
    togglePaused: (state) => {
      state.isPaused = !state.isPaused;
    },
    addGameTime: (state, { payload }) => {
      state.gameTime += payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(`${GAME_LOOP_THUNK}/pending`, (state) => {
      state.isTicking = true;
    });
    builder.addCase(`${GAME_LOOP_THUNK}/fulfilled`, (state) => {
      state.isTicking = false;
    });
    builder.addCase(`${GAME_LOOP_THUNK}/rejected`, (state, { error }) => {
      console.log('Rejected');
      console.error(error.stack);
    });
  },
});

export const isGamePaused = (store) => store.game.isPaused;
export const isGameTicking = (store) => store.game.isTicking;
export const getGamePhase = (store) => store.game.phase;
export const getGameTime = (store) => store.game.gameTime;

export const { actions } = gameSlice;

export default gameSlice.reducer;
