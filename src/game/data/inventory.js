import { STAT_IDS } from './stats';

const ITEM_IDS = {
  WOOD: 'w',
  FISH: 'Fish',
  ASH: 'Ash',
};

const ITEM_BASES = {
  [ITEM_IDS.WOOD]: {
    name: 'Wood',
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_IDS.NONE,
    healAmount: 0,
    description: 'Basic Wood',
  },
  [ITEM_IDS.FISH]: {
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_IDS.WANDER_TIME,
    healAmount: 25,
    description: 'Smelly',
  },
  [ITEM_IDS.ASH]: {
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_IDS.NONE,
    healAmount: 0,
    description: 'Previous home for woodland creatures',
  },
};

const ITEM_DATA = Object.entries(ITEM_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      name: key,
      ...value,
      id: key,
      currentCooldown: 0,
      maxCooldown: 5000, // time between eating in ms
      isActive: false,
    },
  }),
  {}
);

export { ITEM_IDS, ITEM_DATA };
