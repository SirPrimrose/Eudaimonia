import { PHASES } from '../game/consts';
import CalculatedValue from '../game/data/calculatedValue';
import { EXPLORE_DATA } from '../game/data/exploreGroup';
import { ITEM_DATA } from '../game/data/inventory';
import { JOB_DATA } from '../game/data/jobs';
import { SKILL_DATA } from '../game/data/skills';
import { STAT_DATA } from '../game/data/stats';
import { WORLD_RESOURCE_DATA } from '../game/data/worldResource';

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
