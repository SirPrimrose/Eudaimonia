import { STAT_IDS } from './stats';

const ITEM_IDS = {
  // Materials
  PEBBLE: 'Pebble',
  WAX: 'Wax',
  CANDLE: 'Candle',
  RAT_BONE: 'Rat Bone',

  // Food
  CAVE_BUG: 'Cave Bug',
  CAVE_MOSS: 'Cave Moss',
  RAT_MEAT: 'Rat Meat',
};

const ITEM_BASES = {
  [ITEM_IDS.PEBBLE]: {
    name: 'Pebble',
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_IDS.NONE,
    healAmount: 0,
    description: "Tiny stones, not more than a finger's width",
  },
  [ITEM_IDS.WAX]: {
    name: 'Wax',
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_IDS.NONE,
    healAmount: 0,
    description: 'Sticky, but flammable',
  },
  [ITEM_IDS.CANDLE]: {
    name: 'Candle',
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_IDS.NONE,
    healAmount: 0,
    description: 'Not very bright, but offers better vision than darkness',
  },
  [ITEM_IDS.RAT_BONE]: {
    name: 'Rat Bone',
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_IDS.NONE,
    healAmount: 0,
    description: 'You have the sudden urge to bury them',
  },
  [ITEM_IDS.CAVE_BUG]: {
    name: 'Cave Bug',
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_IDS.WANDER_TIME,
    healAmount: 5,
    description: 'Full of protein',
  },
  [ITEM_IDS.CAVE_MOSS]: {
    name: 'Cave Moss',
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_IDS.WANDER_TIME,
    healAmount: 8,
    description: 'Strangely full of flavor',
  },
  [ITEM_IDS.RAT_MEAT]: {
    name: 'Rat Meat',
    currentAmount: 0,
    maxAmount: 10,
    healType: STAT_IDS.WANDER_TIME,
    healAmount: 15,
    description: 'So dry and tough, almost like jerky',
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
