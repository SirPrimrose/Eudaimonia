const STAT_NAMES = {
  PREP_TIME: 'Wanderlust',
  WANDER_TIME: 'Perserverence',
  HEALTH: 'Health',
  MAGIC: 'Magic',
};

// Add unique fields to each stat
const STAT_BASES = {
  [STAT_NAMES.PREP_TIME]: {
    shortName: 'WL',
    baseDecayRate: -0.5,
    decayModifier: 2,
    maxValue: 20,
  },
  [STAT_NAMES.WANDER_TIME]: {
    shortName: 'PS',
    baseDecayRate: 1,
    decayModifier: 1.5,
    maxValue: 100,
  },
  [STAT_NAMES.HEALTH]: {
    shortName: 'HP',
    baseDecayRate: 1,
    decayModifier: 0,
    maxValue: 100,
  },
  [STAT_NAMES.MAGIC]: {
    shortName: 'MP',
    baseDecayRate: 1,
    decayModifier: 0,
    maxValue: 100,
  },
};

const STAT_DATA = Object.entries(STAT_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      ...value,
      name: key,
      currentDecayRate: 0,
      currentValue: 0,
      isActive: true,
    },
  }),
  {}
);

export { STAT_NAMES, STAT_DATA };
