/* eslint-disable no-param-reassign */
import { v4 as uuid } from 'uuid';
import { STAT_DATA, STAT_NAMES } from '../game/data/stats';
import { COMPLETION_TYPE, JOB_DATA, JOB_NAMES } from '../game/data/jobs';
import { getExponentialDecayValue } from '../shared/util';
import { GAME_TICK_TIME, PHASES } from '../shared/consts';
import { ITEM_DATA } from '../game/data/inventory';
import { WORLD_RESOURCE_DATA } from '../game/data/worldResource';
import { EXPLORE_DATA } from '../game/data/exploreGroup';
import {
  SKILL_DATA,
  xpReqForCurrentLevel,
  xpReqForPermLevel,
} from '../game/data/skills';

export const initialState = {
  // GAME
  gameTime: 0,
  phase: PHASES.WANDER,
  isTicking: false,
  isPaused: false,
  currentJobs: [JOB_NAMES.SEARCH_CLEARING],
  // INVENTORY
  items: ITEM_DATA,
  // WORLD
  worldResources: WORLD_RESOURCE_DATA,
  exploreGroups: EXPLORE_DATA,
  // JOBS
  tickRemaining: 1,
  jobs: JOB_DATA,
  queue: [],
  xpAdded: 0,
  // SKILLS
  skills: SKILL_DATA,
  // STATS
  stats: STAT_DATA,
  // TEXT
  messages: [],
};

// GAME
const addGameTime = (state, time) => {
  state.gameTime += time;
};

const addToCurrentJobs = (state, jobName) => {
  if (!state.currentJobs.includes(jobName)) state.currentJobs.push(jobName);
};

const removeFromCurrentJobs = (state, jobName) => {
  state.currentJobs = state.currentJobs.filter((j) => j !== jobName);
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
  exploreGroup.permExplorationScaled = Math.min(
    getExponentialDecayValue(
      exploreGroup.permExploration,
      exploreGroup.yScaling,
      exploreGroup.xScaling
    ),
    exploreGroup.maxExploration
  );

  recalulateAllWorldResources(state.worldResources, state.exploreGroups);
};

const resetExploreGroup = (state, name) => {
  const exploreGroup = state.exploreGroups[name];

  exploreGroup.currentExploration = exploreGroup.permExplorationScaled;

  recalulateAllWorldResources(state.worldResources, state.exploreGroups);
};

// JOBS
const resetQueueTick = (state, tickMult) => {
  state.tickRemaining = tickMult;
};

const tickXpToJob = (state, xp, name) => {
  const job = state.jobs[name];

  const remainingXp = job.maxXp - job.currentXp;
  const tickXp = state.tickRemaining * xp;

  if (remainingXp > 0) {
    if (job.currentXp + tickXp > job.maxXp) {
      // Only add needed xp
      const xpToAdd = job.maxXp - job.currentXp;
      job.currentXp = job.maxXp;
      state.tickRemaining -= xpToAdd / xp;
      return xpToAdd;
    }
    // Add full xp amount
    job.currentXp += tickXp;
    state.tickRemaining = 0;
    return tickXp;
  }
  return 0;
};

const isJobComplete = (state, jobName) => {
  const jobData = state.jobs[jobName];
  return jobData.currentXp >= jobData.maxXp;
};

const resetJobXp = (state, jobName) => {
  const job = state.jobs[jobName];
  job.currentXp = 0;
};

const removeJobFromQueueById = (state, queueId) => {
  state.queue = state.queue.filter((j) => j.queueId !== queueId);
};

// SKILLS
const addXpToSkill = (state, name, xp) => {
  const skill = state.skills[name];

  // Gain xp
  skill.currentXp += xp;
  skill.permXp += xp;

  // Check for level ups
  while (skill.currentXp >= skill.currentLevelXpReq) {
    skill.currentXp -= skill.currentLevelXpReq;
    skill.currentLevel += 1;
    skill.currentLevelXpReq = xpReqForCurrentLevel(skill.currentLevel);
  }

  while (skill.permXp >= skill.permLevelXpReq) {
    skill.permXp -= skill.permLevelXpReq;
    skill.permLevel += 1;
    skill.permLevelXpReq = xpReqForPermLevel(skill.permLevel);
  }

  skill.xpScaling = 1 * 1.01 ** skill.permLevel * 1.05 ** skill.currentLevel;
};

// STATS
// TODO: Redo calculation of decay so that taking larger "jumps" in time does not affect the outcome (need a continuous function)
const decayStat = (state, name, currentTimeMs, decayTimeMs) => {
  const stat = state.stats[name];
  const { baseDecayRate, decayModifier } = stat;

  // Decay rate grows exponentially with time
  const decayRate = baseDecayRate * decayModifier ** (currentTimeMs / 60000);
  const decay = decayRate * (decayTimeMs / 1000);

  stat.currentDecayRate = -decayRate;
  stat.currentValue = Math.min(stat.maxValue, stat.currentValue - decay);
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
      break;
    case COMPLETION_TYPE.HIDE_SELF:
      removeFromCurrentJobs(state, job.name);
      break;
    case COMPLETION_TYPE.EXPLORE_AREA:
      addProgressToExploreGroup(state, event.value, event.exploreAmount);
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
  return baseXpPerTick * skillObj.xpScaling;
};

const tickJobQueue = (state, tickMult) => {
  resetQueueTick(state, tickMult);

  while (shouldTickJobQueue(state)) {
    const currentJob = getFirstJobInQueue(state);

    if (currentJob) {
      // TODO: Add conditional check for requirements before ticking job
      // 1. Is job in current list of jobs that can be done
      // 2. Do I have the item requirements for the job (requires inventory set up); includes if the player already has the maximum of the given items
      // 3. Am I already max exploration for this (if explore area type)
      const xpAdded = tickXpToJob(
        state,
        getXpForTick(state, currentJob.skill),
        currentJob.name
      );
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
        resetJobXp(state, currentJob.name);
        // TODO: Remove this "removeJob" action once requirements are implemented
        if (true) {
          removeJobFromQueueById(state, currentJob.queueId);
        }
      }
    }
  }
  return state.tickRemaining;
};

const runGameLogicLoop = (state, tickMult) => {
  if (!state.isPaused) {
    if (state.queue.length === 0) {
      state.isPaused = true;
    } else {
      const tickRem = tickJobQueue(state, tickMult);
      const jobTime = GAME_TICK_TIME * (tickMult - tickRem);

      decayStat(state, STAT_NAMES.PREP_TIME, state.gameTime, jobTime);

      addGameTime(state, jobTime);
    }
  }
};

export default runGameLogicLoop;
