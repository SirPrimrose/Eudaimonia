const PREP_TAB_IDS = {
  LIFE_SUMMARY: 'LIFE_SUMMARY',
  SOUL_UPGRADES: 'SOUL_UPGRADES',
  RESOURCE_UPGRADES: 'RESOURCE_UPGRADES',
  EPIC_UPGRADES: 'EPIC_UPGRADES',
};

const PREP_TAB_STATE_BASES = {
  [PREP_TAB_IDS.LIFE_SUMMARY]: {
    isActive: true,
  },
  [PREP_TAB_IDS.SOUL_UPGRADES]: {},
  [PREP_TAB_IDS.RESOURCE_UPGRADES]: {},
  [PREP_TAB_IDS.EPIC_UPGRADES]: {},
};

const PREP_TAB_STATE_DATA = Object.entries(PREP_TAB_STATE_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      isActive: false,
      ...value,
      id: key,
    },
  }),
  {}
);

export { PREP_TAB_IDS, PREP_TAB_STATE_DATA };
