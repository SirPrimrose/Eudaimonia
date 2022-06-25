import CalculatedValue from './calculatedValue';

const STAT_IDS = {
  NONE: 'None',
  PREP_TIME: 'Prep',
  WANDER_TIME: 'Wander',
  HEALTH: 'Health',
  MAGIC: 'Magic',
};

const DECAY_SCALING_FACTOR = {
  TIME: 'Time',
  JOB: 'Job',
  ITEM: 'Item',
};

// Add unique fields to each stat
const STAT_BASES = {
  [STAT_IDS.PREP_TIME]: {
    shortName: 'WL',
    baseDecayRate: -0.5,
    decayModifier: 2,
    maxValue: 20,
  },
  [STAT_IDS.WANDER_TIME]: {
    name: 'Energy',
    shortName: 'NRG',
    baseDecayRate: 1,
    decayModifier: 1.5,
    maxValue: 50,
    isActive: true,
  },
  [STAT_IDS.HEALTH]: {
    shortName: 'HP',
    baseDecayRate: 0,
    decayModifier: 1,
    maxValue: 100,
    isActive: true,
  },
  [STAT_IDS.MAGIC]: {
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
      name: key,
      ...value,
      id: key,
      currentDecayRate: CalculatedValue.baseObject(),
      currentValue: 0,
    },
  }),
  {}
);

export { STAT_IDS, STAT_DATA, DECAY_SCALING_FACTOR };
