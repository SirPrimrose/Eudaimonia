import { EXPLORE_GROUP_IDS } from './exploreGroup';
import { ITEM_IDS } from './inventory';
import { JOB_IDS } from './job_consts';
import { SKILL_IDS } from './skills';
import { STAT_IDS } from './stats';
import { WORLD_RESOURCE_IDS } from './worldResource';

const JOB_CATEGORY = {
  ACTION: 'Actions',
  CRAFT: 'Crafting',
  EXPLORATION: 'Explore',
  PROGRESSION: 'Progress',
};

const COMPLETION_TYPE = {
  ITEM: 'Item',
  WORLD_RESOURCE: 'World_Resource',
  UNLOCK_JOB: 'Unlock_Job',
  LOCK_JOB: 'Lock_Job',
  HIDE_SELF: 'Hide_Self',
  EXPLORE_AREA: 'Explore_Area',
  CONSUME_ITEM: 'Consume_Item',
};

const JOB_BASES = {
  [JOB_IDS.PACE]: {
    name: 'Pace',
    skill: SKILL_IDS.AGILITY,
    category: JOB_CATEGORY.ACTION,
    maxXp: 20,
    completionEvents: [],
  },
  [JOB_IDS.WANDER]: {
    skill: SKILL_IDS.AGILITY,
    category: JOB_CATEGORY.ACTION,
    maxXp: 50,
    completionEvents: [],
  },
  [JOB_IDS.COLLECT]: {
    skill: SKILL_IDS.AGILITY,
    category: JOB_CATEGORY.ACTION,
    maxXp: 50,
    completionEvents: [],
  },
  [JOB_IDS.SEARCH_CLEARING]: {
    skill: SKILL_IDS.AGILITY,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 5,
    completionEvents: [
      {
        type: COMPLETION_TYPE.HIDE_SELF,
      },
      {
        type: COMPLETION_TYPE.UNLOCK_JOB,
        value: JOB_IDS.CUT_WOOD,
      },
      {
        type: COMPLETION_TYPE.UNLOCK_JOB,
        value: JOB_IDS.FIGHT_FISH,
      },
      {
        type: COMPLETION_TYPE.UNLOCK_JOB,
        value: JOB_IDS.LEAVE_CLEARING,
      },
      {
        type: COMPLETION_TYPE.UNLOCK_JOB,
        value: JOB_IDS.STUDY_POND,
      },
    ],
  },
  [JOB_IDS.LEAVE_CLEARING]: {
    skill: SKILL_IDS.AGILITY,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 5,
    completionEvents: [
      {
        type: COMPLETION_TYPE.HIDE_SELF,
      },
      {
        type: COMPLETION_TYPE.LOCK_JOB,
        value: JOB_IDS.CATCH_FISH,
      },
      {
        type: COMPLETION_TYPE.LOCK_JOB,
        value: JOB_IDS.STUDY_POND,
      },
    ],
  },
  [JOB_IDS.CUT_WOOD]: {
    skill: SKILL_IDS.WOODCUTTING,
    category: JOB_CATEGORY.ACTION,
    maxXp: 1,
    completionEvents: [
      {
        type: COMPLETION_TYPE.WORLD_RESOURCE,
        value: WORLD_RESOURCE_IDS.TREE,
        item: ITEM_IDS.WOOD,
        numResourceChecked: 1,
      },
      {
        type: COMPLETION_TYPE.UNLOCK_JOB,
        value: JOB_IDS.BURN_WOOD,
      },
    ],
  },
  [JOB_IDS.BURN_WOOD]: {
    skill: SKILL_IDS.COMBAT,
    category: JOB_CATEGORY.ACTION,
    maxXp: 5,
    completionEvents: [
      {
        type: COMPLETION_TYPE.CONSUME_ITEM,
        item: ITEM_IDS.WOOD,
        amount: 5,
      },
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_IDS.ASH,
        amount: 1,
      },
    ],
  },
  [JOB_IDS.STUDY_POND]: {
    skill: SKILL_IDS.FISHING,
    category: JOB_CATEGORY.EXPLORATION,
    maxXp: 3,
    completionEvents: [
      {
        type: COMPLETION_TYPE.EXPLORE_AREA,
        value: EXPLORE_GROUP_IDS.POND,
        exploreAmount: 4,
      },
    ],
  },
  [JOB_IDS.CATCH_FISH]: {
    skill: SKILL_IDS.FISHING,
    category: JOB_CATEGORY.ACTION,
    maxXp: 1,
    completionEvents: [
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_IDS.FISH,
        amount: 1,
      },
    ],
  },
  [JOB_IDS.FIGHT_FISH]: {
    skill: SKILL_IDS.COMBAT,
    category: JOB_CATEGORY.ACTION,
    maxXp: 10,
    completionEvents: [
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_IDS.FISH,
        amount: 1,
      },
    ],
    statDecay: {
      [STAT_IDS.HEALTH]: 5,
    },
  },
};

const JOB_DATA = Object.entries(JOB_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      name: key,
      statDecay: {}, // stat id is key and decay/s is value
      ...value,
      id: key,
      currentXp: 0,
      usedItems: {}, // item id is key and used amount is value
    },
  }),
  {}
);

export { COMPLETION_TYPE, JOB_CATEGORY, JOB_DATA };
