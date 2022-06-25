import { EXPLORE_GROUP_IDS } from './exploreGroup';
import { ITEM_IDS } from './inventory';
import { JOB_IDS } from './job_consts';
import { SKILL_IDS } from './skills';
import { STAT_IDS } from './stats';
import { UNLOCK_CRITERIA } from './unlockCriteria';
import { WORLD_RESOURCE_IDS } from './worldResource';

const JOB_CATEGORY = {
  ACTION: 'Actions',
  CRAFT: 'Crafting',
  EXPLORATION: 'Explore',
  PROGRESSION: 'Progress',
};

const COMPLETION_TYPE = {
  ITEM: 'Item', // {item: item id, amount: #}
  WORLD_RESOURCE: 'World_Resource', // {value: resource id, item: item id, numResourceChecked: #}
  // UNLOCK_JOB: 'Unlock_Job', // {jobId: job id}
  // LOCK_JOB: 'Lock_Job', // {jobId: job id}
  // HIDE_SELF: 'Hide_Self', // no params
  EXPLORE_AREA: 'Explore_Area', // {exploreGroupId: group id, amount: #}
  EXPLORE_GROUP_ACTIVE: 'Explore_Group_Active', // {exploreGroupId: group id, isActive: bool}
  CONSUME_ITEM: 'Consume_Item', // {item: item id, amount: #}
};

const JOB_BASES = {
  [JOB_IDS.CAVE_STORY_1]: {
    name: 'Muster Strength',
    skill: SKILL_IDS.COMBAT,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 1,
    unlockCriteria: [{ type: UNLOCK_CRITERIA.LIMIT_COMPLETIONS }],
    completionEvents: [],
  },
  [JOB_IDS.CAVE_STORY_2]: {
    name: 'Collect Thoughts',
    skill: SKILL_IDS.ORDER,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 1,
    unlockCriteria: [
      { type: UNLOCK_CRITERIA.LIMIT_COMPLETIONS },
      {
        type: UNLOCK_CRITERIA.JOB,
        value: { jobId: JOB_IDS.CAVE_STORY_1 /* , amount: 1 */ },
      },
    ],
    completionEvents: [],
  },
  [JOB_IDS.CAVE_STORY_3]: {
    name: 'Examine Surroundings',
    skill: SKILL_IDS.ATHLETICS,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 2,
    unlockCriteria: [
      { type: UNLOCK_CRITERIA.LIMIT_COMPLETIONS },
      {
        type: UNLOCK_CRITERIA.JOB,
        value: { jobId: JOB_IDS.CAVE_STORY_2 },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.EXPLORE_GROUP_ACTIVE,
        value: { exploreGroupId: EXPLORE_GROUP_IDS.CAVE, isActive: true },
      },
    ],
  },
  [JOB_IDS.UNLOCK_PEBBLES]: {
    name: 'Prospect Cave',
    skill: SKILL_IDS.MINING,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 5,
    unlockCriteria: [
      { type: UNLOCK_CRITERIA.LIMIT_COMPLETIONS },
      {
        type: UNLOCK_CRITERIA.EXPLORE_GROUP,
        value: { exploreGroupId: EXPLORE_GROUP_IDS.CAVE, exploration: 0.02 },
      },
    ],
    completionEvents: [],
  },
  [JOB_IDS.UNLOCK_CAVE_WAX]: {
    name: 'Check Indentation',
    skill: SKILL_IDS.MINING,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 5,
    unlockCriteria: [
      { type: UNLOCK_CRITERIA.LIMIT_COMPLETIONS },
      {
        type: UNLOCK_CRITERIA.EXPLORE_GROUP,
        value: { exploreGroupId: EXPLORE_GROUP_IDS.CAVE, exploration: 0.05 },
      },
    ],
    completionEvents: [],
  },
  [JOB_IDS.UNLOCK_CAVE_MOSS]: {
    name: 'Follow Moisture',
    skill: SKILL_IDS.FARMING,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 5,
    unlockCriteria: [
      { type: UNLOCK_CRITERIA.LIMIT_COMPLETIONS },
      {
        type: UNLOCK_CRITERIA.EXPLORE_GROUP,
        value: { exploreGroupId: EXPLORE_GROUP_IDS.CAVE, exploration: 0.25 },
      },
    ],
    completionEvents: [],
  },
  [JOB_IDS.CAVE_FIGHT_BOSS_1]: {
    name: 'Fight Rat King',
    skill: SKILL_IDS.COMBAT,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 1,
    unlockCriteria: [
      { type: UNLOCK_CRITERIA.LIMIT_COMPLETIONS },
      {
        type: UNLOCK_CRITERIA.EXPLORE_GROUP,
        value: { exploreGroupId: EXPLORE_GROUP_IDS.CAVE, exploration: 0.75 },
      },
    ],
    completionEvents: [],
    statDecay: {
      [STAT_IDS.HEALTH]: 25,
    },
  },
  [JOB_IDS.LEAVE_CAVE]: {
    name: 'Leave Cave',
    skill: SKILL_IDS.ATHLETICS,
    category: JOB_CATEGORY.PROGRESSION,
    maxXp: 5,
    unlockCriteria: [
      { type: UNLOCK_CRITERIA.LIMIT_COMPLETIONS },
      {
        type: UNLOCK_CRITERIA.JOB,
        value: { jobId: JOB_IDS.CAVE_FIGHT_BOSS_1 },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.EXPLORE_GROUP_ACTIVE,
        value: { exploreGroupId: EXPLORE_GROUP_IDS.CAVE, isActive: false },
      },
    ],
  },
  [JOB_IDS.GET_PEBBLES]: {
    name: 'Collect Pebbles',
    skill: SKILL_IDS.MINING,
    category: JOB_CATEGORY.ACTION,
    maxXp: 3,
    unlockCriteria: [
      {
        type: UNLOCK_CRITERIA.JOB,
        value: { jobId: JOB_IDS.UNLOCK_PEBBLES },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_IDS.PEBBLE,
        amount: 1,
      },
    ],
  },
  [JOB_IDS.GET_CAVE_BUG]: {
    name: 'Catch Critter',
    skill: SKILL_IDS.ATHLETICS,
    category: JOB_CATEGORY.ACTION,
    maxXp: 0.5,
    unlockCriteria: [
      {
        type: UNLOCK_CRITERIA.JOB,
        value: { jobId: JOB_IDS.CAVE_STORY_2 },
      },
      {
        type: UNLOCK_CRITERIA.STAT,
        value: { statId: STAT_IDS.WANDER_TIME, threshold: 0.5 },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_IDS.CAVE_BUG,
        amount: 1,
      },
    ],
  },
  [JOB_IDS.GET_WAX]: {
    name: 'Harvest Wax',
    skill: SKILL_IDS.MINING,
    category: JOB_CATEGORY.ACTION,
    maxXp: 3,
    unlockCriteria: [
      {
        type: UNLOCK_CRITERIA.JOB,
        value: { jobId: JOB_IDS.UNLOCK_CAVE_WAX },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_IDS.WAX,
        amount: 1,
      },
    ],
  },
  [JOB_IDS.GET_CAVE_MOSS]: {
    name: 'Collect Moss',
    skill: SKILL_IDS.FARMING,
    category: JOB_CATEGORY.ACTION,
    maxXp: 5,
    unlockCriteria: [
      {
        type: UNLOCK_CRITERIA.JOB,
        value: { jobId: JOB_IDS.UNLOCK_CAVE_MOSS },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.WORLD_RESOURCE,
        value: WORLD_RESOURCE_IDS.CAVE_MOSS,
        item: ITEM_IDS.CAVE_MOSS,
        numResourceChecked: 1,
      },
    ],
  },
  [JOB_IDS.CONSTRUCT_SMALL_SHELTER]: {
    name: 'Construct Shelter',
    skill: SKILL_IDS.MINING,
    category: JOB_CATEGORY.CRAFT,
    maxXp: 5,
    unlockCriteria: [
      { type: UNLOCK_CRITERIA.LIMIT_COMPLETIONS },
      {
        type: UNLOCK_CRITERIA.EXPLORE_GROUP,
        value: { exploreGroupId: EXPLORE_GROUP_IDS.CAVE, exploration: 0.1 },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.EXPLORE_AREA,
        value: EXPLORE_GROUP_IDS.CAVE,
        exploreAmount: 1,
      },
    ],
  },
  [JOB_IDS.CRAFT_CANDLE]: {
    name: 'Make Candle',
    skill: SKILL_IDS.CRAFTING,
    category: JOB_CATEGORY.CRAFT,
    maxXp: 5,
    unlockCriteria: [
      {
        type: UNLOCK_CRITERIA.ITEM,
        value: { itemId: ITEM_IDS.WAX },
      },
      {
        type: UNLOCK_CRITERIA.ITEM,
        value: { itemId: ITEM_IDS.PEBBLE },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.CONSUME_ITEM,
        item: ITEM_IDS.WAX,
        amount: 2,
      },
      {
        type: COMPLETION_TYPE.CONSUME_ITEM,
        item: ITEM_IDS.PEBBLE,
        amount: 2,
      },
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_IDS.CANDLE,
        amount: 1,
      },
    ],
  },
  [JOB_IDS.CAVE_EXPLORE]: {
    name: 'Explore In Darkness',
    skill: SKILL_IDS.ATHLETICS,
    category: JOB_CATEGORY.EXPLORATION,
    maxXp: 5,
    unlockCriteria: [
      {
        type: UNLOCK_CRITERIA.JOB,
        value: { jobId: JOB_IDS.CAVE_STORY_3 },
      },
      {
        type: UNLOCK_CRITERIA.JOB,
        value: { jobId: JOB_IDS.LEAVE_CAVE, amount: -1 },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.EXPLORE_AREA,
        value: EXPLORE_GROUP_IDS.CAVE,
        exploreAmount: 1,
      },
    ],
  },
  [JOB_IDS.CAVE_EXPLORE_2]: {
    name: 'Explore With Candle',
    skill: SKILL_IDS.ATHLETICS,
    category: JOB_CATEGORY.EXPLORATION,
    maxXp: 5,
    unlockCriteria: [
      {
        type: UNLOCK_CRITERIA.ITEM,
        value: { itemId: ITEM_IDS.CANDLE },
      },
      {
        type: UNLOCK_CRITERIA.JOB,
        value: { jobId: JOB_IDS.LEAVE_CAVE, amount: -1 },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.CONSUME_ITEM,
        item: ITEM_IDS.CANDLE,
        amount: 1,
      },
      {
        type: COMPLETION_TYPE.EXPLORE_AREA,
        value: EXPLORE_GROUP_IDS.CAVE,
        exploreAmount: 10,
      },
    ],
  },
  [JOB_IDS.CAVE_FIGHT_1]: {
    name: 'Fight Cave Rat',
    skill: SKILL_IDS.COMBAT,
    category: JOB_CATEGORY.ACTION,
    maxXp: 1,
    unlockCriteria: [
      {
        type: UNLOCK_CRITERIA.EXPLORE_GROUP,
        value: { exploreGroupId: EXPLORE_GROUP_IDS.CAVE, exploration: 0.4 },
      },
    ],
    completionEvents: [
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_IDS.RAT_BONE,
        amount: 1,
      },
      {
        type: COMPLETION_TYPE.ITEM,
        item: ITEM_IDS.RAT_MEAT,
        amount: 1,
      },
    ],
    statDecay: {
      [STAT_IDS.HEALTH]: 10,
    },
  },
};

const JOB_DATA = Object.entries(JOB_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      statDecay: {}, // stat id is key and decay/s is value
      name: key,
      ...value,
      id: key,
      isActive: false,
      currentXp: 0,
      completions: 0,
      usedItems: {}, // item id is key and used amount is value
    },
  }),
  {}
);

export { COMPLETION_TYPE, JOB_CATEGORY, JOB_DATA };
