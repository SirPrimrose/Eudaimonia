/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { STAT_DATA } from '../game/data/stats';

const initialState = {
  stats: STAT_DATA,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addStat: (state, { payload }) => {
      const { name, value } = payload;
      const stat = state.stats[name];

      stat.currentValue = Math.min(stat.maxValue, stat.currentValue + value);
    },
    setStat: (state, { payload }) => {
      const { name, newValue } = payload;

      state.stats[name].currentValue = newValue;
    },
    decayStat: (state, { payload }) => {
      const { name, currentTime, decayTime } = payload;

      // TODO: Implement stat decay based on time interval
      state.stats[name].currentValue -= 1;
    },
  },
});

export const getStatByName = (store) => (statName) =>
  store.stats.stats[statName];

export const { actions } = statsSlice;

export default statsSlice.reducer;
