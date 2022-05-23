const xpReqForCurrentLevel = (level) => Math.floor(10 * 1.1 ** level);

const xpReqForPermLevel = (level) => Math.floor(50 * 1.02 ** level);

const SKILL_NAMES = {
  AGILITY: 'Agility',
  FARMING: 'Farming',
  COMBAT: 'Combat',
  WOODCUTTING: 'Woodcutting',
  FISHING: 'Fishing',
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
      xpScaling: 1,
    },
  }),
  {}
);

export { SKILL_NAMES, SKILL_DATA, xpReqForCurrentLevel, xpReqForPermLevel };
