const STAT_NAMES = {
  NONE: 'None',
  PREP_TIME: 'Wanderlust',
  WANDER_TIME: 'Energy',
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
    shortName: 'NRG',
    baseDecayRate: 5,
    decayModifier: 1.5,
    maxValue: 100,
    isActive: true,
  },
  [STAT_NAMES.HEALTH]: {
    shortName: 'HP',
    baseDecayRate: 0,
    decayModifier: 1,
    maxValue: 100,
    isActive: true,
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
      isActive: false,
      ...value,
      name: key,
      currentDecayRate: -value.baseDecayRate,
      currentValue: 0,
    },
  }),
  {}
);

export { STAT_NAMES, STAT_DATA };
