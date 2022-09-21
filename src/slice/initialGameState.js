import { PHASES } from '../game/consts';
import CalculatedValue from '../game/data/calculatedValue';
import { EXPLORE_DATA } from '../game/data/exploreGroup';
import { ITEM_DATA } from '../game/data/inventory';
import { JOB_DATA } from '../game/data/jobs';
import { PREP_TAB_STATE_DATA } from '../game/data/prepTabs';
import { SKILL_DATA } from '../game/data/skills';
import { STAT_DATA } from '../game/data/stats';
import { WORLD_RESOURCE_DATA } from '../game/data/worldResource';

const initialState = {
  // GAME
  gameTime: 0,
  // TODO: Move soulpower into some sort of "resources" section (perhaps treat it as an item or stat); "resources" have a flag that changes whether the reset on death or not
  // TODO: Implement life modifiers; Array of all active modifiers to values (soulpower, xp gain, etc.); these are saved in state, reset on death, and dynamically added during life
  // You could have two of the same modifier that exists (i.e. 2x soul power from "Story Objective" and 2x soul power from another "Story Objective"), add "source" prop to determine root
  // TODO: Implement soul upgrades; Structured data more like items/jobs with defined minimums/maximums/cost/cost scaling/etc.; These keep track of their level and effects on the game
  // Props include level, min, max, cost, effects
  // TODO: "Effects" is an array of effects on the game. Two upgrades can have the same "effects", though possibly at differing costs or magnitudes
  lifeModifiers: [],
  soulpower: {
    resource: CalculatedValue.baseObject(),
  },
  prepTabs: PREP_TAB_STATE_DATA,
  generationCount: 0,
  phase: PHASES.NEW_GAME,
  isTicking: false,
  isPaused: false,
  isStarted: false,
  exception: null,
  // JOB QUEUE
  tickRemaining: 1,
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

// eslint-disable-next-line import/prefer-default-export
export { initialState };
