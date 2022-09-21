const MOD_TYPE = {
  SKILL_XP_SCALING: 'SKILL_XP_SCALING',
};

// SKILL_XP_SCALING structure
const createSkillXpScalingMod = (skillId, scalingFactor, multiplier) => ({
  id: MOD_TYPE.SKILL_XP_SCALING,
  skillId,
  scalingFactor,
  multiplier,
});

export { MOD_TYPE, createSkillXpScalingMod };
