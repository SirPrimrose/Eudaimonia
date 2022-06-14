import { STAT_NAMES } from './stats';

const ITEM_NAMES = {
  WOOD: 'Wood',
  FISH: 'Fish',
  ASH: 'Ash',
};

const ITEM_BASES = {
  [ITEM_NAMES.WOOD]: {
    currentAmount: 0,
    maxAmount: 1,
    healType: STAT_NAMES.NONE,
    healAmount: 0,
    description: 'Basic Wood',
  },
  [ITEM_NAMES.FISH]: {
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_NAMES.WANDER_TIME,
    healAmount: 25,
    description: 'Smelly',
  },
  [ITEM_NAMES.ASH]: {
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_NAMES.NONE,
    healAmount: 0,
    description: 'Previous home for woodland creatures',
  },
};

const ITEM_DATA = Object.entries(ITEM_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      ...value,
      name: key,
      currentCooldown: 0,
      maxCooldown: 5000, // time between eating in ms
      active: false,
    },
  }),
  {}
);

export { ITEM_NAMES, ITEM_DATA };
