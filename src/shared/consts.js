const GAME_LOOP_THUNK = 'gameLoop';

const GAME_TPS = 60;

const GAME_TICK_TIME = 1000 / GAME_TPS;

const PHASES = {
  WANDER: 'Wander',
  PREP: 'Preparation',
};

export { PHASES, GAME_LOOP_THUNK, GAME_TICK_TIME };
