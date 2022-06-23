import { EXPLORE_GROUP_IDS } from './exploreGroup';

const WORLD_RESOURCE_IDS = {
  TREE: 'Tr',
  FISH: 'Fs',
};

const WORLD_RESOURCE_BASES = {
  [WORLD_RESOURCE_IDS.TREE]: {
    name: 'Tree',
    potencyPerUnlock: 5, // how much potency is required per unlock, determines resource availability
    exploreGroupPotency: {
      [EXPLORE_GROUP_IDS.POND]: 2, // how much potency an explore contributes to current potency
    },
  },
  [WORLD_RESOURCE_IDS.FISH]: {
    name: 'Fish',
    potencyPerUnlock: 10,
    exploreGroupPotency: {
      [EXPLORE_GROUP_IDS.POND]: 2,
    },
  },
};

const WORLD_RESOURCE_DATA = Object.entries(WORLD_RESOURCE_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      name: key,
      ...value,
      id: key,
      usedResource: 0, // current resource available in current life
      unlockedResource: 0, // how much max resource is available
      maxPotency: 0, // total "checks" until max resources, calculated from explore group potency
      checkedPotency: 0, // how many checks have been finished
    },
  }),
  {}
);

export { WORLD_RESOURCE_IDS, WORLD_RESOURCE_DATA };
