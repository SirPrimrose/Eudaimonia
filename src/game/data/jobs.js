import { EXPLORE_GROUP } from './exploreGroup';
import { ITEM_NAMES } from './inventory';
import { SKILL_NAMES } from './skills';

const COMPLETION_TYPE = {
  ITEM: 'Item',
  UNLOCK_JOB: 'Unlock_Job',
  LOCK_JOB: 'Lock_Job',
  HIDE_SELF: 'Hide_Self',
  EXPLORE_AREA: 'Explore_Area',
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
  STUDY_POND: 'Study Pond',
  CATCH_FISH: 'Catch Fish',
  SEARCH_CLEARING: 'Search Clearing',
  LEAVE_CLEARING: 'Leave Clearing',
};

const JOB_BASES = {
  [JOB_NAMES.PACE]: {
    skill: SKILL_NAMES.AGILITY,
    category: JOB_CATEGORY.ACTION,
    currentXp: 0,
    maxXp: 20,
    completionEvents: [],
  },
  [JOB_NAMES.WANDER]: {
    skill: SKILL_NAMES.AGILITY,
    category: JOB_CATEGORY.ACTION,
    currentXp: 0,
    maxXp: 50,
    completionEvents: [],
  },
  [JOB_NAMES.COLLECT]: {
    skill: SKILL_NAMES.AGILITY,
    category: JOB_CATEGORY.ACTION,
    currentXp: 0,
    maxXp: 50,
    completionEvents: [],
  },
  [JOB_NAMES.SEARCH_CLEARING]: {
    skill: SKILL_NAMES.AGILITY,
    category: JOB_CATEGORY.PROGRESSION,
    currentXp: 0,
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
    currentXp: 0,
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
    currentXp: 0,
    maxXp: 10,
    completionEvents: [
      {
        type: COMPLETION_TYPE.ITEM,
        value: ITEM_NAMES.WOOD,
      },
    ],
  },
  [JOB_NAMES.STUDY_POND]: {
    skill: SKILL_NAMES.FISHING,
    category: JOB_CATEGORY.EXPLORATION,
    currentXp: 0,
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
    currentXp: 0,
    maxXp: 3,
    completionEvents: [
      {
        type: COMPLETION_TYPE.ITEM,
        value: ITEM_NAMES.FISH,
      },
    ],
  },
};

export { COMPLETION_TYPE, JOB_NAMES, JOB_BASES };
