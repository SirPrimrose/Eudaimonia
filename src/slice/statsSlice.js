/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wanderlust: 0,
  maxWanderlust: 0,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addWanderlust: (state, { payload }) => {
      state.wanderlust = Math.min(
        state.maxWanderlust,
        state.wanderlust + payload
      );
    },
    resetWanderlust: (state) => {
      state.wanderlust = initialState.wanderlust;
    },
  },
});

export const getWanderlust = (store) => store.stats.wanderlust;
export const getMaxWanderlust = (store) => store.stats.maxWanderlust;

export const { actions } = statsSlice;

export default statsSlice.reducer;
