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
      const { name, currentTimeMs, decayTimeMs } = payload;
      const stat = state.stats[name];
      const { baseDecayRate, decayModifier } = stat;

      // Decay rate grows exponentially with time
      const decayRate =
        baseDecayRate * decayModifier ** (currentTimeMs / 60000);
      const decay = decayRate * (decayTimeMs / 1000);

      stat.currentDecayRate = -decayRate;
      stat.currentValue = Math.min(stat.maxValue, stat.currentValue - decay);
    },
  },
});

export const getStats = (store) => Object.values(store.stats.stats);

export const getStatByName = (store) => (statName) =>
  store.stats.stats[statName];

export const getActiveStats = (store) =>
  getStats(store).filter((stat) => stat.isActive);

export const { actions } = statsSlice;

export default statsSlice.reducer;
