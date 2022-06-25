/* eslint-disable no-param-reassign */
import { v4 as uuid } from 'uuid';
import { DECAY_SCALING_FACTOR, STAT_IDS } from '../game/data/stats';
import { COMPLETION_TYPE } from '../game/data/jobs';
import { getExponentialDecayValue } from '../shared/util';
import { GAME_TICK_TIME, JOB_REJECT_REASONS, PHASES } from '../game/consts';
import {
  xpMultiplierForCurrentLevel,
  xpMultiplierForPermLevel,
  xpReqForCurrentLevel,
  xpReqForPermLevel,
  XP_SCALING_FACTORS,
} from '../game/data/skills';
import CalculatedValue from '../game/data/calculatedValue';
import { calculateSoulpower } from '../game/data/soulpower';
import { UNLOCK_CRITERIA } from '../game/data/unlockCriteria';
import {
  getFirstQueueEntry,
  removeJobFromQueueByQueueId,
  resetjobQueue,
  resetQueueTick,
  shouldTickJobQueue,
} from './jobQueueLogic';

let currentTime = new Date();
let gameTicksRem = 0;

// GAME
const addGameTime = (state, time) => {
  state.gameTime += time;
};

// INVENTORY
const addItem = (state, itemId, amount) => {
  const item = state.items[itemId];

  item.currentAmount = Math.min(item.maxAmount, item.currentAmount + amount);
  item.isActive = true;
};

const removeItem = (state, itemId, amount) => {
  const item = state.items[itemId];

  const actualRemoved = Math.min(amount, item.currentAmount);
  item.currentAmount -= actualRemoved;
  return actualRemoved;
};

const resetItem = (state, itemId) => {
  const item = state.items[itemId];

  item.currentAmount = 0;
  item.currentCooldown = 0;
  item.isActive = false;
};

const isItemFull = (state, itemId) => {
  const item = state.items[itemId];

  return item.currentAmount >= item.maxAmount;
};

const tickFoodHealTime = (state, itemId, tickTime) => {
  const item = state.items[itemId];

  item.currentCooldown = Math.max(item.currentCooldown - tickTime, 0);
};

const canItemHeal = (state, itemId) => {
  const item = state.items[itemId];

  if (
    item.healType !== STAT_IDS.NONE &&
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
 * Directly use the given item id to heal the stat that it should be healing. All logical checks (such as having enough of the item) should be done before calling this.
 */
const useItemHeal = (state, itemId) => {
  const item = state.items[itemId];
  addToStat(state, item.healType, item.healAmount);
  item.currentCooldown = item.maxCooldown;
  item.currentAmount -= 1;
};

// WORLD
const checkWorldResourceCritera = (state, worldResourceId) => {
  const worldResource = state.worldResources[worldResourceId];

  worldResource.isActive =
    worldResource.maxPotency > 0 &&
    worldResource.unlockCriteria.every((criteria) =>
      checkCriteria(state, criteria, worldResource.isActive)
    );
};

const checkAllWorldResourceCritera = (state) => {
  Object.keys(state.worldResources).forEach((worldResourceId) =>
    checkWorldResourceCritera(state, worldResourceId)
  );
};

/**
 * Updates world resource potency to appropriate amounts based on the related explore group progress.
 */
const recalculateAllWorldResources = (state) => {
  // Calulcate world resources
  Object.values(state.worldResources).forEach((worldResource) => {
    worldResource.maxPotency = Object.entries(
      worldResource.exploreGroupPotency
    ).reduce((partialPotency, [exploreGroupId, potency]) => {
      const exploreGroup = state.exploreGroups[exploreGroupId];
      return exploreGroup.isActive
        ? partialPotency +
            Math.floor(state.exploreGroups[exploreGroupId].currentExploration) *
              potency
        : partialPotency;
    }, 0);
  });
};

/* const handleExploreGroupUnlock = (state, unlockType, unlockValue) => {
  switch (unlockType) {
    case EXPLORE_GROUP_UNLOCK_TYPE.ITEM:
      addItem(state, unlockValue.item, unlockValue.amount);
      break;
    default:
      // eslint-disable-next-line no-console
      console.error('No default case for event');
      break;
  }
}; */

/* Shelve this feature in favor of job criteria, re-open when setting up lore messages
const checkExploreGroupUnlocks = (state, exploreGroupId) => {
  const exploreGroup = state.exploreGroups[exploreGroupId];

  Object.values(exploreGroup.conditionalUnlocks).forEach(
    (conditionalUnlock) => {
      if (
        !conditionalUnlock.id ||
        !exploreGroup.completedUnlocks.includes(conditionalUnlock.id)
      ) {
        if (
          exploreGroup.currentExploration >= conditionalUnlock.explorationReq
        ) {
          handleExploreGroupUnlock(
            state,
            conditionalUnlock.unlockType,
            conditionalUnlock.unlockValue
          );
          if (conditionalUnlock.id)
            exploreGroup.completedUnlocks.push(conditionalUnlock.id);
        }
      }
    }
  );
}; */

const setExploreGroupActive = (state, exploreGroupId, isActive) => {
  const exploreGroup = state.exploreGroups[exploreGroupId];
  exploreGroup.isActive = isActive;

  recalculateAllWorldResources(state);
};

const addProgressToExploreGroup = (state, exploreGroupId, exploreAmount) => {
  const exploreGroup = state.exploreGroups[exploreGroupId];

  exploreGroup.currentExploration = Math.min(
    exploreGroup.currentExploration + exploreAmount,
    exploreGroup.maxExploration
  );
  exploreGroup.permExploration += exploreAmount;
  recalculateScaledExploration(state, exploreGroupId);
  // checkExploreGroupUnlocks(state, exploreGroupId);

  recalculateAllWorldResources(state);
};

function recalculateScaledExploration(state, exploreGroupId) {
  const exploreGroup = state.exploreGroups[exploreGroupId];

  exploreGroup.permExplorationScaled = Math.min(
    getExponentialDecayValue(
      exploreGroup.permExploration,
      exploreGroup.yScaling,
      exploreGroup.xScaling
    ),
    exploreGroup.maxExploration
  );
}

function resetExploreGroup(state, exploreGroupId) {
  const exploreGroup = state.exploreGroups[exploreGroupId];

  exploreGroup.currentExploration = exploreGroup.permExplorationScaled;

  setExploreGroupActive(state, exploreGroupId, false);

  recalculateAllWorldResources(state);
}

const recalculateUnlockedResource = (state, worldResourceId) => {
  const worldResource = state.worldResources[worldResourceId];

  worldResource.unlockedResource = Math.floor(
    worldResource.checkedPotency / worldResource.potencyPerUnlock
  );
};

const processWorldResource = (state, worldResourceId, itemResultId) => {
  const worldResource = state.worldResources[worldResourceId];

  if (
    worldResource.usedResource >= worldResource.unlockedResource &&
    worldResource.checkedPotency < worldResource.maxPotency
  ) {
    // Check for a "usable" resource
    worldResource.checkedPotency += 1;
    recalculateUnlockedResource(state, worldResourceId);
  }

  if (worldResource.usedResource + 1 <= worldResource.unlockedResource) {
    addItem(state, itemResultId, 1);
    worldResource.usedResource += 1;
  }
};

const resetWorldResource = (state, worldResourceId) => {
  const worldResource = state.worldResources[worldResourceId];

  worldResource.usedResource = 0;
};

const isWorldResourceAvailable = (state, worldResourceId) => {
  const worldResource = state.worldResources[worldResourceId];

  return (
    worldResource.usedResource < worldResource.unlockedResource ||
    worldResource.checkedPotency < worldResource.maxPotency
  );
};

// JOBS
const itemReqForXp = (currentXp, maxXp, amount) =>
  Math.min(Math.floor((currentXp / maxXp) * amount) + 1, amount);

const tickXpToJob = (state, tickXp, jobId) => {
  const job = state.jobs[jobId];

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

const useItemsForJob = (state, tickXp, jobId) => {
  const job = state.jobs[jobId];

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

const isJobComplete = (state, jobId) => {
  const jobData = state.jobs[jobId];
  return jobData.currentXp >= jobData.maxXp;
};

const resetJobUsedItems = (state, jobId) => {
  const job = state.jobs[jobId];

  job.usedItems = {};
};

const resetJobXp = (state, jobId) => {
  const job = state.jobs[jobId];
  job.currentXp = 0;
};

const incrementJobCompletion = (state, jobId) => {
  const job = state.jobs[jobId];
  job.completions++;
};

const resetJobActive = (state, jobId) => {
  const job = state.jobs[jobId];
  job.isActive = false;
  job.completions = 0;
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

const isJobAvailable = (state, jobId) => {
  const job = state.jobs[jobId];
  return job.isActive;
};

/**
 * Checks for the items required for the given job is available (does not use items)
 */
const checkJobCraftingRequirements = (state, jobId) => {
  const job = state.jobs[jobId];

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
 * Validates whether the given job id is currently ready to work.
 * @returns null if the job can be worked on, otherwise returns a reason for the job being uncompletable
 */
const blockerForJob = (state, jobId) => {
  const job = state.jobs[jobId];

  if (!isJobAvailable(state, jobId)) {
    return JOB_REJECT_REASONS.UNAVAILABLE;
  }
  if (isJobItemsFull(state, job)) {
    return JOB_REJECT_REASONS.FULL_INVENTORY;
  }
  if (isJobResourceUnavailable(state, job)) {
    return JOB_REJECT_REASONS.NO_RESOURCE;
  }
  // TODO: Check for required items for crafting recipies
  if (!checkJobCraftingRequirements(state, jobId)) {
    return JOB_REJECT_REASONS.MISSING_CRAFTING_RESOURCES;
  }
  // TODO: Check for max exploration

  return null;
};

/**
 * Checks the critera for a job and sets the "isActive" flag
 */
const checkJobCriteria = (state, jobId) => {
  const job = state.jobs[jobId];

  job.isActive = job.unlockCriteria.every((criteria) =>
    checkCriteria(state, criteria, job.isActive, job.completions)
  );
};

const checkAllJobCritera = (state) => {
  Object.keys(state.jobs).forEach((jobId) => checkJobCriteria(state, jobId));
};

const performJobCompletionEvent = (state, job, event) => {
  switch (event.type) {
    case COMPLETION_TYPE.EXPLORE_GROUP_ACTIVE:
      setExploreGroupActive(
        state,
        event.value.exploreGroupId,
        event.value.isActive
      );
      break;
    case COMPLETION_TYPE.EXPLORE_AREA:
      addProgressToExploreGroup(state, event.value, event.exploreAmount);
      break;
    case COMPLETION_TYPE.ITEM:
      addItem(state, event.item, event.amount);
      break;
    case COMPLETION_TYPE.CONSUME_ITEM:
      // Completion type is handled by useItemsForJob
      break;
    case COMPLETION_TYPE.WORLD_RESOURCE:
      processWorldResource(state, event.value, event.item);
      break;
    default:
      // eslint-disable-next-line no-console
      console.error(`No default case for event ${event.type}`);
      break;
  }
};

// SKILLS
const recalculateSkillXpReq = (state, skillId) => {
  const skill = state.skills[skillId];

  skill.currentLevelXpReq = xpReqForCurrentLevel(skill.currentLevel);
  skill.permLevelXpReq = xpReqForPermLevel(skill.permLevel);
};

const recalculateSkillXpScaling = (state, skillId) => {
  const skill = state.skills[skillId];

  const calculatedValue = new CalculatedValue(skill.xpScaling.baseValue);

  calculatedValue.addModifier(
    XP_SCALING_FACTORS.CURRENT_LEVEL,
    CalculatedValue.MODIFIER_TYPE.MULTIPLICATIVE,
    skill.currentLevel,
    xpMultiplierForCurrentLevel(skill.currentLevel)
  );
  calculatedValue.addModifier(
    XP_SCALING_FACTORS.PERM_LEVEL,
    CalculatedValue.MODIFIER_TYPE.MULTIPLICATIVE,
    skill.permLevel,
    xpMultiplierForPermLevel(skill.permLevel)
  );

  // GLOBAL XP MODIFIERS
  if (state.generationCount <= 3) {
    calculatedValue.addModifier(
      XP_SCALING_FACTORS.NEW_GAME,
      CalculatedValue.MODIFIER_TYPE.MULTIPLICATIVE,
      -1,
      state.generationCount * 0.2 + 0.2
    );
  }

  skill.xpScaling = calculatedValue.toObj;
};

const addXpToSkill = (state, skillId, xp) => {
  const skill = state.skills[skillId];

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
    recalculateSkillXpReq(state, skill.id);
    recalculateSkillXpScaling(state, skill.id);
  }
};

const resetSkill = (state, skillId) => {
  const skill = state.skills[skillId];

  skill.currentLevel = 0;
  skill.currentXp = 0;
  skill.currentLevelXpReq = xpReqForCurrentLevel(0);
};

// STATS
function addToStat(state, statId, value) {
  const stat = state.stats[statId];

  stat.currentValue = Math.max(
    Math.min(stat.maxValue, stat.currentValue + value),
    0
  );
}

const updateDecayRate = (state, statId) => {
  const stat = state.stats[statId];

  const calculatedValue = new CalculatedValue(stat.baseDecayRate);

  calculatedValue.addModifier(
    DECAY_SCALING_FACTOR.TIME,
    CalculatedValue.MODIFIER_TYPE.MULTIPLICATIVE,
    -1,
    stat.decayModifier ** (state.gameTime / 60000)
  );
  const queueEntry = getFirstQueueEntry(state);
  if (queueEntry) {
    const currentJob = state.jobs[queueEntry.jobId];
    if (currentJob.statDecay[stat.id]) {
      calculatedValue.addModifier(
        `${DECAY_SCALING_FACTOR.JOB}: ${currentJob.name}`,
        CalculatedValue.MODIFIER_TYPE.ADDITIVE,
        -1,
        currentJob.statDecay[stat.id]
      );
    }
  }

  stat.currentDecayRate = calculatedValue.toObj;
};

const decayStat = (state, statId, decayTimeMs) => {
  const stat = state.stats[statId];

  // Decay rate grows exponentially with time
  updateDecayRate(state, statId);

  const decay = stat.currentDecayRate.value * (decayTimeMs / 1000);
  addToStat(state, statId, -decay);
};

const resetStat = (state, statId) => {
  const stat = state.stats[statId];
  if (stat.baseDecayRate < 0) {
    stat.currentValue = 0;
  } else {
    stat.currentValue = stat.maxValue;
  }
};

const getStatValue = (state, statId) => {
  const stat = state.stats[statId];
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
/**
 * Checks state against given criteria. Some params only apply to certain data types.
 * @param {*} state Current state
 * @param {*} criteria Criteria object
 * @param {*} alreadyActive If data is already active (default false)
 * @param {*} completions Only applies to jobs. Current job completions (default 0)
 * @returns True if the criteria passes
 */
function checkCriteria(
  state,
  criteria,
  alreadyActive = false,
  completions = 0
) {
  switch (criteria.type) {
    case UNLOCK_CRITERIA.LIMIT_COMPLETIONS: {
      return completions < (criteria.value || 1);
    }
    case UNLOCK_CRITERIA.JOB: {
      const jobToCheck = state.jobs[criteria.value.jobId];
      if (criteria.value.amount && criteria.value.amount < 0) {
        return jobToCheck.completions <= Math.abs(criteria.value.amount);
      }
      return jobToCheck.completions >= (criteria.value.amount || 1);
    }
    case UNLOCK_CRITERIA.ITEM: {
      if (alreadyActive) return true; // Item unlocks always remain unlocked
      const itemToCheck = state.items[criteria.value.itemId];
      return itemToCheck.currentAmount >= (criteria.value.amount || 1);
    }
    case UNLOCK_CRITERIA.EXPLORE_GROUP: {
      const exploreGroupToCheck =
        state.exploreGroups[criteria.value.exploreGroupId];
      const explorationPercent =
        exploreGroupToCheck.currentExploration /
        exploreGroupToCheck.maxExploration;
      return (
        exploreGroupToCheck.isActive &&
        explorationPercent >= criteria.value.exploration
      );
    }
    case UNLOCK_CRITERIA.STAT: {
      if (alreadyActive) return true; // Stat unlocks always remain unlocked
      const statToCheck = state.stats[criteria.value.statId];
      const statPercent = statToCheck.currentValue / statToCheck.maxValue;
      return statPercent <= criteria.value.threshold;
    }
    default:
      // eslint-disable-next-line no-console
      console.error(`No default case for criteria ${criteria.type}`);
      return true;
  }
}

const getXpForTick = (state, skillId) => {
  const baseXpPerTick = GAME_TICK_TIME / 1000;
  const skillObj = state.skills[skillId];
  return baseXpPerTick * skillObj.xpScaling.value;
};

const tickJobQueue = (state) => {
  resetQueueTick(state);

  while (shouldTickJobQueue(state)) {
    const queueEntry = getFirstQueueEntry(state);

    if (queueEntry) {
      const currentJob = state.jobs[queueEntry.jobId];
      const blocker = blockerForJob(state, currentJob.id);
      if (blocker) {
        // TODO: Display dialog for reason why it was removed (requires toast dialog system)
        removeJobFromQueueByQueueId(state, queueEntry.queueId);
        addMessage(state, `Canceled ${currentJob.name}: ${blocker}`);
      } else {
        const xpForTick = getXpForTick(state, currentJob.skill);
        const xpRemaining = state.tickRemaining * xpForTick;
        const xpAfterItemReq = useItemsForJob(
          state,
          xpRemaining,
          currentJob.id
        );
        const xpAdded = tickXpToJob(state, xpAfterItemReq, currentJob.id);
        state.tickRemaining -= xpAdded / xpForTick;
        addXpToSkill(state, currentJob.skill, xpAdded);

        /* addMessage(
          state,
          `${currentJob.name} gained ${xpAdded} xp and now has ${
            state.jobs[currentJob.id].currentXp
          } xp`
        ); */

        // If job is complete, perform "completionEvents" according to job
        if (isJobComplete(state, currentJob.id)) {
          currentJob.completionEvents.forEach((event) => {
            performJobCompletionEvent(state, currentJob, event);
          });
          resetJobUsedItems(state, currentJob.id);
          resetJobXp(state, currentJob.id);
          incrementJobCompletion(state, currentJob.id);
          if (queueEntry.iterations > 0) {
            queueEntry.iterations--;
            if (queueEntry.iterations <= 0) {
              removeJobFromQueueByQueueId(state, queueEntry.queueId);
            }
          }
        }
      }
    }
  }
  return state.tickRemaining;
};

const tickFood = (state, tickTime) => {
  Object.keys(state.items).forEach((itemId) => {
    tickFoodHealTime(state, itemId, tickTime);
    if (canItemHeal(state, itemId)) {
      useItemHeal(state, itemId);
    }
  });
};

/**
 * Startup function to load all deterministic data at the loading of the game
 */
const startupGame = (state) => {
  // Calculate deterministic values
  Object.keys(state.skills).forEach((skillId) => {
    recalculateSkillXpReq(state, skillId);
    recalculateSkillXpScaling(state, skillId);
  });

  Object.keys(state.stats).forEach((statId) => {
    updateDecayRate(state, statId);
  });

  Object.keys(state.exploreGroups).forEach((exploreGroupId) => {
    recalculateScaledExploration(state, exploreGroupId);
    // checkExploreGroupUnlocks(state, exploreGroupId);
  });

  recalculateAllWorldResources(state);

  checkAllJobCritera(state);
  checkAllWorldResourceCritera(state);

  state.isStarted = true;
};

/**
 * Restarts the player to the beginning of their next life
 */
const startNewLife = (state) => {
  resetjobQueue(state);

  Object.keys(state.jobs).forEach((jobId) => {
    resetJobUsedItems(state, jobId);
    resetJobXp(state, jobId);
    resetJobActive(state, jobId);
  });

  Object.keys(state.stats).forEach((statId) => {
    resetStat(state, statId);
  });

  Object.keys(state.skills).forEach((skillId) => {
    resetSkill(state, skillId);
  });

  Object.keys(state.items).forEach((itemId) => {
    resetItem(state, itemId);
  });

  Object.keys(state.worldResources).forEach((worldResourceId) => {
    resetWorldResource(state, worldResourceId);
  });

  Object.keys(state.exploreGroups).forEach((exploreGroupId) => {
    resetExploreGroup(state, exploreGroupId);
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
  getStatValue(state, STAT_IDS.HEALTH) <= 0 ||
  getStatValue(state, STAT_IDS.WANDER_TIME) <= 0;

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

        Object.keys(state.stats).forEach((statId) => {
          decayStat(state, statId, jobTime);
        });

        addGameTime(state, jobTime);

        // do job unlocking
        checkAllJobCritera(state);
        checkAllWorldResourceCritera(state);

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

export { runGameLogicLoop, reviveCharacter };
