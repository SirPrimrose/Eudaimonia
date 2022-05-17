import { STAT_NAMES } from './stats';

const ITEM_NAMES = {
  WOOD: 'Wood',
  FISH: 'Fish',
};

const ITEM_BASES = {
  [ITEM_NAMES.WOOD]: {
    currentAmount: 0,
    maxAmount: 20,
  },
  [ITEM_NAMES.FISH]: {
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_NAMES.HEALTH,
    healAmount: 25,
  },
};

const ITEM_DATA = Object.entries(ITEM_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      ...value,
      name: key,
      currentExploration: 0,
      permExploration: 0, // unscaled value of exploration, see scaled exploration for comparable values
      permExplorationScaled: 0,
    },
  }),
  {}
);

export { ITEM_NAMES, ITEM_DATA };
