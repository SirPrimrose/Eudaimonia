/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { EXPLORE_DATA } from '../game/data/exploreGroup';
import { getExponentialDecayValue } from '../shared/util';

const initialState = {
  exploreGroups: EXPLORE_DATA,
};

export const exploreGroupSlice = createSlice({
  name: 'exploreGroup',
  initialState,
  reducers: {
    addProgressToExploreGroup: (state, { payload }) => {
      const { name, exploreAmount } = payload;

      const exploreGroup = state.exploreGroups[name];

      exploreGroup.currentExploration = Math.min(
        exploreGroup.currentExploration + exploreAmount,
        exploreGroup.maxExploration
      );
      exploreGroup.permExploration += exploreAmount;
      exploreGroup.permExplorationScaled = Math.min(
        getExponentialDecayValue(
          exploreGroup.permExploration,
          exploreGroup.yScaling,
          exploreGroup.xScaling
        ),
        exploreGroup.maxExploration
      );
    },
  },
});

export const getExploreGroups = (store) => store.exploreGroup.exploreGroups;

export const getExploreGroupByName = (store) => (groupName) =>
  getExploreGroups(store)[groupName];

export const { actions } = exploreGroupSlice;

export default exploreGroupSlice.reducer;
