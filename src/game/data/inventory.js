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
    maxAmount: 10,
    description: "Tiny stones, not more than a finger's width",
  },
  [ITEM_IDS.WAX]: {
    name: 'Wax',
    maxAmount: 10,
    description: 'Sticky, but flammable',
  },
  [ITEM_IDS.CANDLE]: {
    name: 'Candle',
    maxAmount: 10,
    description: 'Not very bright, but offers better vision than darkness',
  },
  [ITEM_IDS.RAT_BONE]: {
    name: 'Rat Bone',
    maxAmount: 10,
    description: 'You have the sudden urge to bury them',
  },
  [ITEM_IDS.CAVE_BUG]: {
    name: 'Cave Bug',
    maxAmount: 10,
    healType: STAT_IDS.WANDER_TIME,
    healAmount: 5,
    description: 'Full of protein',
  },
  [ITEM_IDS.CAVE_MOSS]: {
    name: 'Cave Moss',
    maxAmount: 10,
    healType: STAT_IDS.WANDER_TIME,
    healAmount: 8,
    description: 'Strangely full of flavor',
  },
  [ITEM_IDS.RAT_MEAT]: {
    name: 'Rat Meat',
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
      healType: STAT_IDS.NONE,
      healAmount: 0,
      name: key,
      ...value,
      id: key,
      currentAmount: 0,
      currentCooldown: 0,
      maxCooldown: 5000, // time between eating in ms
      isActive: false,
    },
  }),
  {}
);

export { ITEM_IDS, ITEM_DATA };
