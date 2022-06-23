import CalculatedValue from './calculatedValue';

const xpReqForCurrentLevel = (level) => Math.floor(10 * 1.1 ** level);

const xpReqForPermLevel = (level) => Math.floor(50 * 1.02 ** level);

const xpMultiplierForCurrentLevel = (level) => 1.05 ** level;

const xpMultiplierForPermLevel = (level) => 1.01 ** level;

const SKILL_IDS = {
  AGILITY: 'Ag',
  FARMING: 'Fm',
  COMBAT: 'Cb',
  WOODCUTTING: 'Wc',
  FISHING: 'Fs',
};

const XP_SCALING_FACTORS = {
  CURRENT_LEVEL: 'Life',
  PERM_LEVEL: 'Soul',
  NEW_GAME: 'Awakening',
};

// Add unique fields to each skill
const SKILL_BASES = {
  [SKILL_IDS.AGILITY]: {
    name: 'Agility',
  },
  [SKILL_IDS.FARMING]: {
    name: 'Farming',
  },
  [SKILL_IDS.COMBAT]: {},
  [SKILL_IDS.WOODCUTTING]: {},
  [SKILL_IDS.FISHING]: {},
};

const SKILL_DATA = Object.entries(SKILL_BASES).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: {
      name: key,
      ...value,
      id: key,
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
  SKILL_IDS,
  XP_SCALING_FACTORS,
  SKILL_DATA,
  xpReqForCurrentLevel,
  xpReqForPermLevel,
  xpMultiplierForCurrentLevel,
  xpMultiplierForPermLevel,
};
