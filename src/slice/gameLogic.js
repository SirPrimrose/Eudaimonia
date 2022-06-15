/* eslint-disable no-param-reassign */
import { v4 as uuid } from 'uuid';
import { STAT_DATA, STAT_NAMES } from '../game/data/stats';
import { COMPLETION_TYPE, JOB_CATEGORY, JOB_DATA } from '../game/data/jobs';
import { getExponentialDecayValue } from '../shared/util';
import { GAME_TICK_TIME, JOB_REJECT_REASONS, PHASES } from '../game/consts';
import { ITEM_DATA } from '../game/data/inventory';
import { WORLD_RESOURCE_DATA } from '../game/data/worldResource';
import { EXPLORE_DATA } from '../game/data/exploreGroup';
import {
  SKILL_DATA,
  xpMultiplierForCurrentLevel,
  xpMultiplierForPermLevel,
  xpReqForCurrentLevel,
  xpReqForPermLevel,
  XP_SCALING_FACTORS,
} from '../game/data/skills';
import CalculatedValue from '../game/data/calculatedValue';
import { calculateSoulpower } from '../game/data/soulpower';
import { JOB_NAMES } from '../game/data/job_consts';

const initialState = {
  // GAME
  gameTime: 0,
  // Move soulpower into some sort of "resources" section (perhaps treat it as an item or stat)
  soulpower: {
    resource: CalculatedValue.baseObject(),
    // currentLifeMultipliers: [], TODO: Create way to add (times N) multipliers to soulpower caluclation (these should probably just go into the "upgrades" prop, no?)
  },
  upgrades: [], // TODO: Implement upgrades; Array of all active modifiers to values, filter by type
  generationCount: 0,
  phase: PHASES.NEW_GAME,
  isTicking: false,
  isPaused: false,
  isStarted: false,
  // JOB QUEUE
  tickRemaining: 1,
  currentJobs: {}, // Key is category and value is the array of jobs in them
  queue: [],
  // INVENTORY
  items: ITEM_DATA,
  // WORLD
  worldResources: WORLD_RESOURCE_DATA,
  exploreGroups: EXPLORE_DATA,
  // JOBS
  jobs: JOB_DATA,
  // SKILLS
  skills: SKILL_DATA,
  // STATS
  stats: STAT_DATA,
  // TEXT
  messages: [],
};

let currentTime = new Date();
let gameTicksRem = 0;

// GAME
const addGameTime = (state, time) => {
  state.gameTime += time;
};

const addToCurrentJobs = (state, jobName) => {
  const job = state.jobs[jobName];
  if (!state.currentJobs[job.category]) state.currentJobs[job.category] = [];
  if (!state.currentJobs[job.category].includes(jobName))
    state.currentJobs[job.category].push(jobName);
};

const removeFromCurrentJobs = (state, jobName) => {
  const job = state.jobs[jobName];
  state.currentJobs[job.category] = state.currentJobs[job.category].filter(
    (j) => j !== jobName
  );
};

// JOB QUEUE
const resetQueueTick = (state) => {
  state.tickRemaining = 1;
};

const removeJobFromQueueById = (state, queueId) => {
  state.queue = state.queue.filter((j) => j.queueId !== queueId);
};

const removeJobFromQueueByName = (state, jobName) => {
  state.queue = state.queue.filter((j) => j.name !== jobName);
};

const isJobAvailable = (state, jobName) =>
  Object.values(state.currentJobs).some((jobsInCategory) =>
    jobsInCategory.includes(jobName)
  );

const resetjobQueue = (state) => {
  state.queue = initialState.queue;
};

const shouldTickJobQueue = (state) =>
  state.tickRemaining > 0 && state.queue.length > 0;

const getFirstJobInQueue = (state) => {
  const firstJobRaw = state.queue.find(() => true);
  if (firstJobRaw) {
    const firstJobData = state.jobs[firstJobRaw.name];
    return {
      ...firstJobRaw,
      ...firstJobData,
    };
  }
  return null;
};

// INVENTORY
const addItem = (state, name, amount) => {
  const item = state.items[name];

  item.currentAmount = Math.min(item.maxAmount, item.currentAmount + amount);
  item.isActive = true;
};

const removeItem = (state, name, amount) => {
  const item = state.items[name];

  const actualRemoved = Math.min(amount, item.currentAmount);
  item.currentAmount -= actualRemoved;
  return actualRemoved;
};

const resetItem = (state, name) => {
  const item = state.items[name];

  item.currentAmount = 0;
  item.currentCooldown = 0;
};

const isItemFull = (state, name) => {
  const item = state.items[name];

  return item.currentAmount >= item.maxAmount;
};

const tickFoodHealTime = (state, name, tickTime) => {
  const item = state.items[name];

  item.currentCooldown = Math.max(item.currentCooldown - tickTime, 0);
};

const canItemHeal = (state, name) => {
  const item = state.items[name];

  if (
    item.healType !== STAT_NAMES.NONE &&
    item.currentCooldown <= 0 &&
    item.currentAmount >= 1
  ) {
    const stat = state.stats[item.healType];
    const { healAmount } = item;
    // 1. Can we fully use the heal amount
    const healAtMaxEfficiency = stat.currentValue + healAmount <= stat.maxValue;
    // 2. Do we need the heal right now
    const healNeededImmediately = stat.currentValue <= 0;
    if (healAtMaxEfficiency || healNeededImmediately) {
      return true;
    }
  }
  return false;
};

/**
 * Directly use the given item name to heal the stat that it should be healing. All logical checks (such as having enough of the item) should be done before calling this.
 */
const useItemHeal = (state, name) => {
  const item = state.items[name];
  addToStat(state, item.healType, item.healAmount);
  item.currentCooldown = item.maxCooldown;
  item.currentAmount -= 1;
};

// WORLD
const recalulateAllWorldResources = (worldResources, exploreGroups) => {
  Object.values(worldResources).forEach((worldResource) => {
    worldResource.maxPotency = Object.entries(
      worldResource.exploreGroupPotency
    ).reduce(
      (partialPotency, [exploreGroupName, potency]) =>
        partialPotency +
        Math.floor(exploreGroups[exploreGroupName].currentExploration) *
          potency,
      0
    );
  });
};

const addProgressToExploreGroup = (state, name, exploreAmount) => {
  const exploreGroup = state.exploreGroups[name];

  exploreGroup.currentExploration = Math.min(
    exploreGroup.currentExploration + exploreAmount,
    exploreGroup.maxExploration
  );
  exploreGroup.permExploration += exploreAmount;
  recalculateExploreGroupExploration(state, name);
};

function recalculateExploreGroupExploration(state, name) {
  const exploreGroup = state.exploreGroups[name];

  exploreGroup.permExplorationScaled = Math.min(
    getExponentialDecayValue(
      exploreGroup.permExploration,
      exploreGroup.yScaling,
      exploreGroup.xScaling
    ),
    exploreGroup.maxExploration
  );
}

function resetExploreGroup(state, name) {
  const exploreGroup = state.exploreGroups[name];

  exploreGroup.currentExploration = exploreGroup.permExplorationScaled;

  recalulateAllWorldResources(state.worldResources, state.exploreGroups);
}

const recalculateUnlockedResource = (state, worldResourceName) => {
  const worldResource = state.worldResources[worldResourceName];

  worldResource.unlockedResource = Math.floor(
    worldResource.checkedPotency / worldResource.potencyPerUnlock
  );
};

const processWorldResource = (state, worldResourceName, itemResultName) => {
  const worldResource = state.worldResources[worldResourceName];

  if (
    worldResource.usedResource >= worldResource.unlockedResource &&
    worldResource.checkedPotency < worldResource.maxPotency
  ) {
    // Check for a "usable" resource
    worldResource.checkedPotency += 1;
    recalculateUnlockedResource(state, worldResourceName);
  }

  if (worldResource.usedResource + 1 <= worldResource.unlockedResource) {
    addItem(state, itemResultName, 1);
    worldResource.usedResource += 1;
  }
};

const resetWorldResource = (state, worldResourceName) => {
  const worldResource = state.worldResources[worldResourceName];

  worldResource.usedResource = 0;
};

const isWorldResourceAvailable = (state, worldResourceName) => {
  const worldResource = state.worldResources[worldResourceName];

  return (
    worldResource.usedResource < worldResource.unlockedResource ||
    worldResource.checkedPotency < worldResource.maxPotency
  );
};

// JOBS
const itemReqForXp = (currentXp, maxXp, amount) =>
  Math.min(Math.floor((currentXp / maxXp) * amount) + 1, amount);

const tickXpToJob = (state, tickXp, name) => {
  const job = state.jobs[name];

  const remainingXp = job.maxXp - job.currentXp;

  if (remainingXp > 0) {
    if (job.currentXp + tickXp > job.maxXp) {
      // Only add needed xp
      const xpToAdd = job.maxXp - job.currentXp;
      job.currentXp = job.maxXp;
      return xpToAdd;
    }
    // Add full xp amount
    job.currentXp += tickXp;
    return tickXp;
  }
  return 0;
};

const useItemsForJob = (state, tickXp, jobName) => {
  const job = state.jobs[jobName];

  const remainingXp =
    Math.min(
      ...job.completionEvents
        .filter((e) => e.type === COMPLETION_TYPE.CONSUME_ITEM)
        .map((e) => {
          const itemsAlreadyUsed = job.usedItems[e.item] || 0;
          const currentItemAmount = state.items[e.item].currentAmount;
          const possibleItemUsage = itemsAlreadyUsed + currentItemAmount;
          return (possibleItemUsage / e.amount) * job.maxXp;
        }),
      job.maxXp
    ) - job.currentXp;

  if (remainingXp > 0) {
    const limitedTickXp = Math.min(remainingXp, tickXp);
    job.completionEvents
      .filter((e) => e.type === COMPLETION_TYPE.CONSUME_ITEM)
      .forEach((e) => {
        const itemsAlreadyUsed = job.usedItems[e.item] || 0;

        const endXp = job.currentXp + limitedTickXp;
        const endItemNeeded = itemReqForXp(endXp, job.maxXp, e.amount);
        const numItemUsed = endItemNeeded - itemsAlreadyUsed;

        const actualUsed = removeItem(state, e.item, numItemUsed);
        job.usedItems[e.item] = itemsAlreadyUsed + actualUsed;
      });
    return limitedTickXp;
  }
  return tickXp;
};

const isJobComplete = (state, jobName) => {
  const jobData = state.jobs[jobName];
  return jobData.currentXp >= jobData.maxXp;
};

const resetJobUsedItems = (state, jobName) => {
  const job = state.jobs[jobName];

  job.usedItems = {};
};

const resetJobXp = (state, jobName) => {
  const job = state.jobs[jobName];
  job.currentXp = 0;
};

const isJobItemsFull = (state, job) => {
  const jobsThatGiveItems = job.completionEvents.filter(
    (e) =>
      e.type === COMPLETION_TYPE.ITEM ||
      e.type === COMPLETION_TYPE.WORLD_RESOURCE
  );
  return (
    jobsThatGiveItems.length > 0 &&
    jobsThatGiveItems.every((e) => isItemFull(state, e.item))
  );
};

const isJobResourceUnavailable = (state, job) =>
  job.completionEvents.some(
    (e) =>
      e.type === COMPLETION_TYPE.WORLD_RESOURCE &&
      !isWorldResourceAvailable(state, e.value)
  );

/**
 * Checks for the items required for the given job is available (does not use items)
 */
const checkJobCraftingRequirements = (state, jobName) => {
  const job = state.jobs[jobName];

  return job.completionEvents
    .filter((e) => e.type === COMPLETION_TYPE.CONSUME_ITEM)
    .every((e) => {
      const itemsAlreadyUsed = job.usedItems[e.item] || 0;
      const currentNeededItem = itemReqForXp(
        job.currentXp,
        job.maxXp,
        e.amount
      );
      const currentItemAmount = state.items[e.item].currentAmount;
      return currentItemAmount >= currentNeededItem - itemsAlreadyUsed;
    });
};

/**
 * Validates whether the named job is currently ready to work.
 * @returns null if the job can be worked on, otherwise returns a reason for the job being uncompletable
 */
const blockerForJob = (state, jobName) => {
  const job = state.jobs[jobName];

  if (!isJobAvailable(state, jobName)) {
    return JOB_REJECT_REASONS.UNAVAILABLE;
  }
  if (isJobItemsFull(state, job)) {
    return JOB_REJECT_REASONS.FULL_INVENTORY;
  }
  if (isJobResourceUnavailable(state, job)) {
    return JOB_REJECT_REASONS.NO_RESOURCE;
  }
  // TODO: Check for required items for crafting recipies
  if (!checkJobCraftingRequirements(state, jobName)) {
    return JOB_REJECT_REASONS.MISSING_CRAFTING_RESOURCES;
  }
  // TODO: Check for max exploration

  return null;
};

// SKILLS
const recalculateSkillXpReq = (state, skillName) => {
  const skill = state.skills[skillName];

  skill.currentLevelXpReq = xpReqForCurrentLevel(skill.currentLevel);
  skill.permLevelXpReq = xpReqForPermLevel(skill.permLevel);
};

const recalculateSkillXpScaling = (state, name) => {
  const skill = state.skills[name];

  const calculatedValue = new CalculatedValue(skill.xpScaling.baseValue);

  calculatedValue.addModifier(
    XP_SCALING_FACTORS.CURRENT_LEVEL,
    skill.currentLevel,
    xpMultiplierForCurrentLevel(skill.currentLevel)
  );
  calculatedValue.addModifier(
    XP_SCALING_FACTORS.PERM_LEVEL,
    skill.permLevel,
    xpMultiplierForPermLevel(skill.permLevel)
  );

  // GLOBAL XP MODIFIERS
  if (state.generationCount <= 4) {
    calculatedValue.addModifier(
      XP_SCALING_FACTORS.NEW_GAME,
      -1,
      state.generationCount * 0.2 + 0.1
    );
  }

  skill.xpScaling = calculatedValue.toObj;
};

const addXpToSkill = (state, name, xp) => {
  const skill = state.skills[name];

  // Gain xp
  skill.currentXp += xp;
  skill.permXp += xp;

  let leveledUp = false;
  // Check for level ups
  while (skill.currentXp >= skill.currentLevelXpReq) {
    skill.currentXp -= skill.currentLevelXpReq;
    skill.currentLevel += 1;
    leveledUp = true;
  }

  while (skill.permXp >= skill.permLevelXpReq) {
    skill.permXp -= skill.permLevelXpReq;
    skill.permLevel += 1;
    leveledUp = true;
  }

  if (leveledUp) {
    recalculateSkillXpReq(state, skill.name);
    recalculateSkillXpScaling(state, name);
  }
};

const resetSkill = (state, name) => {
  const skill = state.skills[name];

  skill.currentLevel = 0;
  skill.currentXp = 0;
  skill.currentLevelXpReq = xpReqForCurrentLevel(0);
};

// STATS
function addToStat(state, name, value) {
  const stat = state.stats[name];

  stat.currentValue = Math.max(
    Math.min(stat.maxValue, stat.currentValue + value),
    0
  );
}

const updateDecayRate = (state, name) => {
  const stat = state.stats[name];

  stat.currentDecayRate =
    stat.baseDecayRate * stat.decayModifier ** (state.gameTime / 60000);
};

const decayStat = (state, name, decayTimeMs) => {
  const stat = state.stats[name];

  // Decay rate grows exponentially with time
  updateDecayRate(state, name);

  const decay = stat.currentDecayRate * (decayTimeMs / 1000);
  addToStat(state, name, -decay);
};

const resetStat = (state, name) => {
  const stat = state.stats[name];
  if (stat.baseDecayRate < 0) {
    stat.currentValue = 0;
  } else {
    stat.currentValue = stat.maxValue;
  }
};

const getStatValue = (state, name) => {
  const stat = state.stats[name];
  if (stat) {
    return stat.currentValue;
  }
  return 0;
};

// TEXT LOG
const addMessage = (state, message) => {
  state.messages.push({ listId: uuid(), text: message });

  if (state.messages.length >= 25) {
    state.messages.shift();
  }
};

// MAIN
const performJobCompletionEvent = (state, job, event) => {
  switch (event.type) {
    case COMPLETION_TYPE.UNLOCK_JOB:
      addToCurrentJobs(state, event.value);
      break;
    case COMPLETION_TYPE.LOCK_JOB:
      removeFromCurrentJobs(state, event.value);
      removeJobFromQueueByName(state, event.value);
      break;
    case COMPLETION_TYPE.HIDE_SELF:
      removeFromCurrentJobs(state, job.name);
      removeJobFromQueueByName(state, job.name);
      break;
    case COMPLETION_TYPE.EXPLORE_AREA:
      addProgressToExploreGroup(state, event.value, event.exploreAmount);
      break;
    case COMPLETION_TYPE.ITEM:
      addItem(state, event.item, event.amount);
      break;
    case COMPLETION_TYPE.WORLD_RESOURCE:
      processWorldResource(state, event.value, event.item);
      break;
    default:
      // eslint-disable-next-line no-console
      console.error('No default case for event');
      break;
  }
};

const getXpForTick = (state, skillName) => {
  const baseXpPerTick = GAME_TICK_TIME / 1000;
  const skillObj = state.skills[skillName];
  return baseXpPerTick * skillObj.xpScaling.value;
};

const tickJobQueue = (state) => {
  resetQueueTick(state);

  while (shouldTickJobQueue(state)) {
    const currentJob = getFirstJobInQueue(state);

    if (currentJob) {
      const blocker = blockerForJob(state, currentJob.name);
      if (blocker) {
        // TODO: Display dialog for reason why it was removed (requires toast dialog system)
        removeJobFromQueueById(state, currentJob.queueId);
        addMessage(state, `Canceled ${currentJob.name}: ${blocker}`);
      } else {
        const xpForTick = getXpForTick(state, currentJob.skill);
        const xpRemaining = state.tickRemaining * xpForTick;
        const xpAfterItemReq = useItemsForJob(
          state,
          xpRemaining,
          currentJob.name
        );
        const xpAdded = tickXpToJob(state, xpAfterItemReq, currentJob.name);
        state.tickRemaining -= xpAdded / xpForTick;
        addXpToSkill(state, currentJob.skill, xpAdded);

        addMessage(
          state,
          `${currentJob.name} gained ${xpAdded} xp and now has ${
            state.jobs[currentJob.name].currentXp
          } xp`
        );

        // If job is complete, perform "completionEvents" according to job
        if (isJobComplete(state, currentJob.name)) {
          currentJob.completionEvents.forEach((event) => {
            performJobCompletionEvent(state, currentJob, event);
          });
          resetJobUsedItems(state, currentJob.name);
          resetJobXp(state, currentJob.name);
        }
      }
    }
  }
  return state.tickRemaining;
};

const tickFood = (state, tickTime) => {
  Object.keys(state.items).forEach((itemName) => {
    tickFoodHealTime(state, itemName, tickTime);
    if (canItemHeal(state, itemName)) {
      useItemHeal(state, itemName);
    }
  });
};

/**
 * Startup function to load all deterministic data at the loading of the game
 */
const startupGame = (state) => {
  // Calculate deterministic values
  Object.keys(state.skills).forEach((skillName) => {
    recalculateSkillXpReq(state, skillName);
    recalculateSkillXpScaling(state, skillName);
  });

  Object.keys(state.stats).forEach((statName) => {
    updateDecayRate(state, statName);
  });

  Object.keys(state.exploreGroups).forEach((exploreGroupName) => {
    recalculateExploreGroupExploration(state, exploreGroupName);
  });

  recalulateAllWorldResources(state.worldResources, state.exploreGroups);

  state.isStarted = true;
};

/**
 * Restarts the player to the beginning of their next life
 */
const startNewLife = (state) => {
  state.currentJobs = {
    [JOB_CATEGORY.ACTION]: [],
    [JOB_CATEGORY.CRAFT]: [],
    [JOB_CATEGORY.EXPLORATION]: [],
    [JOB_CATEGORY.PROGRESSION]: [JOB_NAMES.SEARCH_CLEARING],
  };

  resetjobQueue(state);

  Object.keys(state.jobs).forEach((jobName) => {
    resetJobUsedItems(state, jobName);
    resetJobXp(state, jobName);
  });

  Object.keys(state.stats).forEach((statName) => {
    resetStat(state, statName);
  });

  Object.keys(state.skills).forEach((skillName) => {
    resetSkill(state, skillName);
  });

  Object.keys(state.items).forEach((itemName) => {
    resetItem(state, itemName);
  });

  Object.keys(state.worldResources).forEach((worldResourceName) => {
    resetWorldResource(state, worldResourceName);
  });

  Object.keys(state.exploreGroups).forEach((exploreGroupName) => {
    resetExploreGroup(state, exploreGroupName);
  });

  state.phase = PHASES.WANDER;
};

/**
 * Starts a brand new game for the player, assuming a completely new player
 */
const startNewGame = (state) => {
  startNewLife(state);
};

/**
 * Returns true if dead by whatever reason, false if not
 */
const isPlayerDead = (state) =>
  getStatValue(state, STAT_NAMES.HEALTH) <= 0 ||
  getStatValue(state, STAT_NAMES.WANDER_TIME) <= 0;

const playerHasDied = (state) => {
  state.soulpower.resource = calculateSoulpower(state);

  state.phase = PHASES.PREP;
};

const reviveCharacter = (state) => {
  state.generationCount += 1;
  state.gameTime = 0;

  startNewLife(state);
  startupGame(state);
};

const tickGame = (state) => {
  if (state.phase === PHASES.WANDER) {
    if (!state.isPaused) {
      if (state.queue.length === 0) {
        state.isPaused = true;
      } else {
        const tickRem = tickJobQueue(state);
        const jobTime = GAME_TICK_TIME * (1 - tickRem);

        Object.keys(state.stats).forEach((statName) => {
          decayStat(state, statName, jobTime);
        });

        addGameTime(state, jobTime);

        // Check for eating food
        tickFood(state, jobTime);

        // Check for death
        if (isPlayerDead(state)) {
          playerHasDied(state);
        }
      }
    }
  }
};

const runGameLogicLoop = (state, tickMult) => {
  if (state.phase === PHASES.NEW_GAME) {
    startNewGame(state);
  }

  if (!state.isStarted) {
    startupGame(state);
  }

  // Calc ticks to process
  const newTime = Date.now();
  gameTicksRem += newTime - currentTime;
  currentTime = newTime;
  const currentTickDuration = GAME_TICK_TIME / tickMult;
  while (gameTicksRem >= currentTickDuration) {
    tickGame(state);
    gameTicksRem -= currentTickDuration;
  }
};

export { initialState, runGameLogicLoop, reviveCharacter };
