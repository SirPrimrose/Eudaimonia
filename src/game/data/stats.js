const STAT_NAMES = {
  PREP_TIME: 'Wanderlust',
  WANDER_TIME: 'Perserverence',
  HEALTH: 'HP',
  MAGIC: 'MP',
};

// Add unique fields to each stat
const STAT_BASES = {
  [STAT_NAMES.PREP_TIME]: {
    baseDecayRate: -0.5,
    decayModifier: 2,
    maxValue: 20,
  },
  [STAT_NAMES.WANDER_TIME]: {
    baseDecayRate: 1,
    decayModifier: 1.5,
    maxValue: 100,
  },
  [STAT_NAMES.HEALTH]: { baseDecayRate: 1, decayModifier: 0, maxValue: 100 },
  [STAT_NAMES.MAGIC]: { baseDecayRate: 1, decayModifier: 0, maxValue: 100 },
};

const STAT_DATA = Object.entries(STAT_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      ...value,
      name: key,
      currentDecayRate: 0,
      currentValue: 0,
    },
  }),
  {}
);

export { STAT_NAMES, STAT_DATA };
