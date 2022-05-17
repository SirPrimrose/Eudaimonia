/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { EXPLORE_DATA } from '../game/data/exploreGroup';
import { WORLD_RESOURCE_DATA } from '../game/data/worldResource';
import { getExponentialDecayValue } from '../shared/util';

const initialState = {
  worldResources: WORLD_RESOURCE_DATA,
  exploreGroups: EXPLORE_DATA,
};

const recalulateAllWorldResources = (worldResources, exploreGroups) => {
  Object.values(worldResources).forEach((worldResource) => {
    worldResource.maxPotency = Object.entries(
      worldResource.exploreGroupPotency
    ).reduce(
      (partialPotency, [exploreGroupName, potency]) =>
        partialPotency +
        Math.floor(exploreGroups[exploreGroupName].currentExploration) *
          potency,
      0
    );
  });
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

      recalulateAllWorldResources(state.worldResources, state.exploreGroups);
    },
    resetExploreGroup: (state, { payload: name }) => {
      const exploreGroup = state.exploreGroups[name];

      exploreGroup.currentExploration = exploreGroup.permExplorationScaled;

      recalulateAllWorldResources(state.worldResources, state.exploreGroups);
    },
  },
});

export const getExploreGroups = (store) => store.exploreGroup.exploreGroups;

export const getExploreGroupByName = (store) => (groupName) =>
  getExploreGroups(store)[groupName];

export const getWorldResources = (store) => store.exploreGroup.worldResources;

export const { actions } = exploreGroupSlice;

export default exploreGroupSlice.reducer;
