import CalculatedValue from './calculatedValue';

const xpReqForCurrentLevel = (level) => Math.floor(10 * 1.1 ** level);

const xpReqForPermLevel = (level) => Math.floor(50 * 1.02 ** level);

const xpMultiplierForCurrentLevel = (level) => 1.05 ** level;

const xpMultiplierForPermLevel = (level) => 1.01 ** level;

const SKILL_NAMES = {
  AGILITY: 'Agility',
  FARMING: 'Farming',
  COMBAT: 'Combat',
  WOODCUTTING: 'Woodcutting',
  FISHING: 'Fishing',
};

const XP_SCALING_FACTORS = {
  CURRENT_LEVEL: 'Life',
  PERM_LEVEL: 'Soul',
  NEW_GAME: 'Awakening',
};

// Add unique fields to each skill
const SKILL_BASES = {
  [SKILL_NAMES.AGILITY]: {},
  [SKILL_NAMES.FARMING]: {},
  [SKILL_NAMES.COMBAT]: {},
  [SKILL_NAMES.WOODCUTTING]: {},
  [SKILL_NAMES.FISHING]: {},
};

const SKILL_DATA = Object.entries(SKILL_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      ...value,
      name: key,
      currentLevel: 0,
      currentXp: 0,
      currentLevelXpReq: xpReqForCurrentLevel(0),
      permLevel: 0,
      permXp: 0,
      permLevelXpReq: xpReqForPermLevel(0),
      xpScaling: CalculatedValue.baseObject(1),
    },
  }),
  {}
);

export {
  SKILL_NAMES,
  XP_SCALING_FACTORS,
  SKILL_DATA,
  xpReqForCurrentLevel,
  xpReqForPermLevel,
  xpMultiplierForCurrentLevel,
  xpMultiplierForPermLevel,
};
