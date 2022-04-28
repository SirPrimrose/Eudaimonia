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
  },
};

export { ITEM_NAMES, ITEM_BASES };
