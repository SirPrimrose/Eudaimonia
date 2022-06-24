import { EXPLORE_GROUP_IDS } from './exploreGroup';

const WORLD_RESOURCE_IDS = {
  CAVE_MOSS: 'CAVE_MOSS',
  FISH: 'Fs',
};

const WORLD_RESOURCE_BASES = {
  [WORLD_RESOURCE_IDS.CAVE_MOSS]: {
    name: 'Cave Moss',
    potencyPerUnlock: 2.5, // how much potency is required per unlock, determines resource availability
    exploreGroupPotency: {
      [EXPLORE_GROUP_IDS.CAVE]: 1, // how much potency an explore contributes to current potency
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
