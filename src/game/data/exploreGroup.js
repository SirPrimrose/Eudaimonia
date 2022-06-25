const EXPLORE_GROUP_UNLOCK_TYPE = {
  JOB: 'Job', // job id
  ITEM: 'Item', // { item: item id, amount: # } (Probably instead unlock a job that gives # amount of items)
  // SKILL_BONUS: 'Skill Bonus' (Probably just unlock a job that gives skill bonus instead, will be easier to track)
  MESSAGE: 'Message', // TODO
};

const EXPLORE_GROUP_IDS = {
  CAVE: 'CAVE',
};

const EXPLORE_BASES = {
  [EXPLORE_GROUP_IDS.CAVE]: {
    name: 'Cave',
    yScaling: 125.3,
    xScaling: 0.0016,
    maxExploration: 100,
    // Consider adding unlockCriteria like jobs to set isActive flag, instead of job completion event
    isActive: false,
    completedUnlocks: [], // TODO: Decide if these unlocks should reset every life (for now they unlock only once if given an ID)
    conditionalUnlocks: [
      /* {
        explorationReq: 100,
        unlockType: EXPLORE_GROUP_UNLOCK_TYPE.JOB,
        unlockValue: JOB_IDS.CAVE_ALTAR,
      }, */
      /* {
        explorationReq: 40,
        unlockType: EXPLORE_GROUP_UNLOCK_TYPE.SKILL_BONUS, // TODO (Probably just unlock a job that gives skill bonus instead)
        unlockValue: { skill: SKILL_NAMES.FISHING, amount: 1.25 },
      }, */
    ],
  },
};

const EXPLORE_DATA = Object.entries(EXPLORE_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      name: key,
      ...value,
      id: key,
      currentExploration: 0,
      permExploration: 0, // unscaled value of exploration, see scaled exploration for comparable values
      permExplorationScaled: 0,
    },
  }),
  {}
);

export { EXPLORE_GROUP_UNLOCK_TYPE, EXPLORE_GROUP_IDS, EXPLORE_DATA };
