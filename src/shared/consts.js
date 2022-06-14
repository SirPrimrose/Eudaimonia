const GAME_TPS = 60;

const GAME_TICK_TIME = 1000 / GAME_TPS;

const MULTIPLICATION_SIGN = '⨯';

const PHASES = {
  NEW_GAME: 'New Game',
  WANDER: 'Wander',
  PREP: 'Preparation',
};

const JOB_REJECT_REASONS = {
  UNAVAILABLE: 'Job is not currently available',
  FULL_INVENTORY: 'Inventory is full of the produced item',
  NO_RESOURCE: 'World Resource is unavailable',
  MISSING_CRAFTING_RESOURCES: 'Crafting resources unavailable.',
};

export { PHASES, GAME_TICK_TIME, JOB_REJECT_REASONS, MULTIPLICATION_SIGN };
