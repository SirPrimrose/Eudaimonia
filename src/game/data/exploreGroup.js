import { ITEM_NAMES } from './inventory';
import { JOB_NAMES } from './job_consts';
import { SKILL_NAMES } from './skills';

const EXPLORE_GROUP_UNLOCK_TYPE = {
  JOB: 'Job',
  ITEM: 'Item',
  SKILL_BONUS: 'Skil Bonus',
};

const EXPLORE_GROUP = {
  POND: 'Pond',
};

const EXPLORE_BASES = {
  [EXPLORE_GROUP.POND]: {
    yScaling: 125.3,
    xScaling: 0.0016,
    maxExploration: 50,
    // TODO: Only display "active" explore groups and only show conditional unlocks from "active" groups
    isActive: false, // TODO: Add job completion event to set these as "active" or "inactive"
    completedUnlocks: [], // TODO: Decide if these unlocks should reset every life
    conditionalUnlocks: [
      {
        explorationReq: 10,
        unlockType: EXPLORE_GROUP_UNLOCK_TYPE.JOB,
        unlockValue: JOB_NAMES.CATCH_FISH,
      },
      {
        id: 1, // Giving an id makes this unlock non-repeatable
        explorationReq: 20,
        unlockType: EXPLORE_GROUP_UNLOCK_TYPE.ITEM,
        unlockValue: { item: ITEM_NAMES.FISH, amount: 5 },
      },
      /* {
        explorationReq: 40,
        unlockType: EXPLORE_GROUP_UNLOCK_TYPE.SKILL_BONUS, // TODO
        unlockValue: { skill: SKILL_NAMES.FISHING, amount: 1.25 },
      }, */
    ],
  },
};

const EXPLORE_DATA = Object.entries(EXPLORE_BASES).reduce(
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

export { EXPLORE_GROUP_UNLOCK_TYPE, EXPLORE_GROUP, EXPLORE_DATA };
