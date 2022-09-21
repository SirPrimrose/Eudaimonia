import CalculatedValue from './calculatedValue';

const xpReqForCurrentLevel = (level) => Math.floor(10 * 1.1 ** level);

const xpReqForPermLevel = (level) => Math.floor(50 * 1.02 ** level);

const xpMultiplierForCurrentLevel = (level) => 1.05 ** level;

const xpMultiplierForPermLevel = (level) => 1.01 ** level;

const SKILL_IDS = {
  COMBAT: 'Cb',
  MINING: 'Mn',
  WOODCUTTING: 'Wc',
  FARMING: 'Fm',
  FISHING: 'Fs',
  SMITHING: 'Sm',
  CRAFTING: 'Cf',
  COOKING: 'Ck',
  BREWING: 'Bw',
  ARTIFICE: 'Ar',
  ATHLETICS: 'Ah',
  CONSTRUCTION: 'Cn',
  RITUAL: 'Rt',
  ORDER: 'Od',
  CHAOS: 'Ca',
};

const XP_SCALING_FACTORS = {
  CURRENT_LEVEL: 'Life',
  PERM_LEVEL: 'Soul',
  NEW_GAME: 'Awakening',
  TOOL_TIER_1: 'Bone Tool',
};

// Add unique fields to each skill
const SKILL_BASES = {
  [SKILL_IDS.COMBAT]: {
    name: 'Resolve',
  },
  [SKILL_IDS.MINING]: {
    name: 'Mining',
  },
  [SKILL_IDS.WOODCUTTING]: {
    name: 'Woodcutting',
  },
  [SKILL_IDS.FARMING]: {
    name: 'Farming',
  },
  [SKILL_IDS.FISHING]: {
    name: 'Fishing',
  },
  [SKILL_IDS.SMITHING]: {
    name: 'Smithing',
  },
  [SKILL_IDS.CRAFTING]: {
    name: 'Crafting',
  },
  [SKILL_IDS.COOKING]: {
    name: 'Cooking',
  },
  [SKILL_IDS.BREWING]: {
    name: 'Brewing',
  },
  [SKILL_IDS.ARTIFICE]: {
    name: 'Artifice',
  },
  [SKILL_IDS.ATHLETICS]: {
    name: 'Athletics',
  },
  [SKILL_IDS.CONSTRUCTION]: {
    name: 'Construction',
  },
  [SKILL_IDS.RITUAL]: {
    name: 'Ritual',
  },
  [SKILL_IDS.ORDER]: {
    name: 'Order',
  },
  [SKILL_IDS.CHAOS]: {
    name: 'Chaos',
  },
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
