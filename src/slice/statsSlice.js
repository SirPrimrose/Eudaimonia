/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// TODO: Convert to inventory slice
const initialState = {
  wanderlust: 0,
  maxWanderlust: 20,
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
