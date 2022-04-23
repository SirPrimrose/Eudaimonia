const SKILL_NAMES = {
  AGILITY: 'Agility',
  FARMING: 'Farming',
  COMBAT: 'Combat',
};

const SKILL_BASES = {
  [SKILL_NAMES.AGILITY]: {
    currentLevel: 0,
    currentXp: 0,
    evoLevel: 0,
    permXp: 0,
  },
  [SKILL_NAMES.FARMING]: {
    currentLevel: 0,
    currentXp: 0,
    permLevel: 0,
    permXp: 0,
  },
  [SKILL_NAMES.COMBAT]: {
    currentLevel: 0,
    currentXp: 0,
    permLevel: 0,
    permXp: 0,
  },
};

export { SKILL_NAMES, SKILL_BASES };
