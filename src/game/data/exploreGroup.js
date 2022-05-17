const EXPLORE_GROUP = {
  POND: 'Pond',
};

const EXPLORE_BASES = {
  [EXPLORE_GROUP.POND]: {
    yScaling: 125.3,
    xScaling: 0.0016,
    maxExploration: 50,
  },
};

const EXPLORE_DATA = Object.keys(EXPLORE_BASES).reduce(
  (result, key) => ({
    ...result,
    [key]: {
      ...EXPLORE_BASES[key],
      currentExploration: 0,
      permExploration: 0, // unscaled value of exploration, see scaled exploration for comparable values
      permExplorationScaled: 0,
    },
  }),
  {}
);

export { EXPLORE_GROUP, EXPLORE_DATA };
