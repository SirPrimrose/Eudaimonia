import { EXPLORE_GROUP } from './exploreGroup';
import { ITEM_NAMES } from './inventory';
import { SKILL_NAMES } from './skills';
import { WORLD_RESOURCE_NAMES } from './worldResource';

const COMPLETION_TYPE = {
  ITEM: 'Item',
  WORLD_RESOURCE: 'World_Resource',
  UNLOCK_JOB: 'Unlock_Job',
  LOCK_JOB: 'Lock_Job',
  HIDE_SELF: 'Hide_Self',
  EXPLORE_AREA: 'Explore_Area',
  CONSUME_ITEM: 'Consume_Item',
};

const JOB_CATEGORY = {
  ACTION: 'Actions',
  CRAFT: 'Crafting',
  EXPLORATION: 'Explore',
  PROGRESSION: 'Progress',
};

const JOB_NAMES = {
  PACE: 'Pace',
  WANDER: 'Wander',
  COLLECT: 'Collect',
  CUT_WOOD: 'Cut Wood',
  BURN_WOOD: 'Burn Wood',
  STUDY_POND: 'Study Pond',
  CATCH_FISH: 'Catch Fish',
  SEARCH_CLEARING: 'Search Clearing',
  LEAVE_CLEARING: 'Leave Clearing',
};

const JOB_BASES = {
  [JOB_NAMES.PACE]: {
    skill: SKILL_NAMES.AGILITY,
    category: JOB_CATEGORY.ACTION,
    maxXp: 20,
    completionEvents: [],
  },
  [JOB_NAMES.WANDER]: {
    skill: SKILL_NAMES.AGILITY,
    category: JOB_CATEGORY.ACTION,
    maxXp: 50,
    completionEvents: [],
  },
  [JOB_NAMES.COLLECT]: {
    skill: SKILL_NAMES.AGILITY,
    category: JOB_CATEGORY.ACTION,
    maxXp: 50,
    completionEvents: [],
  },
  [JOB_NAMES.SEARCH_CLEARING]: {
    skill: SKILL_NAMES.AGILITY,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 5,
    completionEvents: [
      {
        type: COMPLETION_TYPE.HIDE_SELF,
      },
      {
        type: COMPLETION_TYPE.UNLOCK_JOB,
        value: JOB_NAMES.CATCH_FISH,
      },
      {
        type: COMPLETION_TYPE.UNLOCK_JOB,
        value: JOB_NAMES.CUT_WOOD,
      },
      {
        type: COMPLETION_TYPE.UNLOCK_JOB,
        value: JOB_NAMES.LEAVE_CLEARING,
      },
      {
        type: COMPLETION_TYPE.UNLOCK_JOB,
        value: JOB_NAMES.STUDY_POND,
      },
    ],
  },
  [JOB_NAMES.LEAVE_CLEARING]: {
    skill: SKILL_NAMES.AGILITY,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 5,
    completionEvents: [
      {
        type: COMPLETION_TYPE.HIDE_SELF,
      },
      {
        type: COMPLETION_TYPE.LOCK_JOB,
        value: JOB_NAMES.CATCH_FISH,
      },
      {
        type: COMPLETION_TYPE.LOCK_JOB,
        value: JOB_NAMES.STUDY_POND,
      },
    ],
  },
  [JOB_NAMES.CUT_WOOD]: {
    skill: SKILL_NAMES.WOODCUTTING,
    category: JOB_CATEGORY.ACTION,
    maxXp: 1,
    completionEvents: [
      {
        type: COMPLETION_TYPE.WORLD_RESOURCE,
        value: WORLD_RESOURCE_NAMES.TREE,
        item: ITEM_NAMES.WOOD,
        numResourceChecked: 1,
      },
      {
        type: COMPLETION_TYPE.UNLOCK_JOB,
        value: JOB_NAMES.BURN_WOOD,
      },
    ],
  },
  [JOB_NAMES.BURN_WOOD]: {
    skill: SKILL_NAMES.COMBAT,
    category: JOB_CATEGORY.ACTION,
    maxXp: 5,
    completionEvents: [
      {
        type: COMPLETION_TYPE.CONSUME_ITEM,
        item: ITEM_NAMES.WOOD,
        amount: 5,
      },
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_NAMES.ASH,
        amount: 1,
      },
    ],
  },
  [JOB_NAMES.STUDY_POND]: {
    skill: SKILL_NAMES.FISHING,
    category: JOB_CATEGORY.EXPLORATION,
    maxXp: 5,
    completionEvents: [
      {
        type: COMPLETION_TYPE.EXPLORE_AREA,
        value: EXPLORE_GROUP.POND,
        exploreAmount: 10,
      },
    ],
  },
  [JOB_NAMES.CATCH_FISH]: {
    skill: SKILL_NAMES.FISHING,
    category: JOB_CATEGORY.ACTION,
    maxXp: 1,
    completionEvents: [
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_NAMES.FISH,
        amount: 1,
      },
    ],
  },
};

const JOB_DATA = Object.entries(JOB_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      ...value,
      name: key,
      currentXp: 0,
      usedItems: {}, // item name is key and used amount is value
    },
  }),
  {}
);

export { COMPLETION_TYPE, JOB_CATEGORY, JOB_NAMES, JOB_DATA };
