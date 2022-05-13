const EXPLORE_GROUP = {
  POND: 'Pond',
};

// Add unique fields to each skill
const EXPLORE_BASES = {
  [EXPLORE_GROUP.POND]: {
    yScaling: 125.3,
    xScaling: 0.0016,
  },
};

const EXPLORE_DATA = Object.keys(EXPLORE_BASES).reduce(
  (result, key) => ({
    ...result,
    [key]: {
      ...EXPLORE_BASES[key],
      currentExploration: 0,
      permExploration: 0,
      permExplorationScaled: 0,
      maxExploration: 100,
    },
  }),
  {}
);

export { EXPLORE_GROUP, EXPLORE_DATA };
