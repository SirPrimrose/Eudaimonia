import { EXPLORE_GROUP } from './exploreGroup';

const WORLD_RESOURCE_NAMES = {
  FISH: 'Fish',
};

const WORLD_RESOURCE_BASES = {
  [WORLD_RESOURCE_NAMES.FISH]: {
    potencyPerUnlock: 10, // how much potency is required per unlock, determines resource availability
    exploreGroupPotency: {
      [EXPLORE_GROUP.POND]: 2, // how much potency an explore contribute to current potency
    },
  },
};

const WORLD_RESOURCE_DATA = Object.keys(WORLD_RESOURCE_BASES).reduce(
  (result, key) => ({
    ...result,
    [key]: {
      ...WORLD_RESOURCE_BASES[key],
      currentResource: 0, // current resource available in current life
      maxPotency: 0, // total "checks" until max resources, calculated from explore group potency
      checkedPotency: 0, // how many checks have been finished
      unlockedResource: 0, // how much max resource is available
    },
  }),
  {}
);

export { WORLD_RESOURCE_NAMES, WORLD_RESOURCE_DATA };
