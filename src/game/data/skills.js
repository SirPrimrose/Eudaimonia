const xpReqForCurrentLevel = (level) => Math.floor(10 * 1.1 ** level);

const xpReqForPermLevel = (level) => Math.floor(50 * 1.02 ** level);

const SKILL_NAMES = {
  AGILITY: 'Agility',
  FARMING: 'Farming',
  COMBAT: 'Combat',
};

// Add unique fields to each skill
const SKILL_BASES = {
  [SKILL_NAMES.AGILITY]: {},
  [SKILL_NAMES.FARMING]: {},
  [SKILL_NAMES.COMBAT]: {},
};

const SKILL_DATA = Object.keys(SKILL_BASES).reduce(
  (result, key) => ({
    ...result,
    [key]: {
      ...SKILL_BASES[key],
      currentLevel: 0,
      currentXp: 0,
      currentLevelXpReq: xpReqForCurrentLevel(0),
      permLevel: 0,
      permXp: 0,
      permLevelXpReq: xpReqForPermLevel(0),
    },
  }),
  {}
);

export { SKILL_NAMES, SKILL_DATA, xpReqForCurrentLevel, xpReqForPermLevel };
