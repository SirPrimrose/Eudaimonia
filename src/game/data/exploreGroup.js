import { JOB_NAMES } from './job_consts';

const EXPLORE_GROUP_UNLOCK_TYPE = {
  JOB: 'Job',
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
    isActive: false,
    // TODO: Conditionally unlock jobs based on the given values
    conditionalUnlocks: [
      {
        explorationReq: 0.1,
        unlockType: EXPLORE_GROUP_UNLOCK_TYPE.JOB,
        unlockedValue: JOB_NAMES.CATCH_FISH,
      },
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

export { EXPLORE_GROUP, EXPLORE_DATA };
