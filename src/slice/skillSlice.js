/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  SKILL_DATA,
  xpReqForCurrentLevel,
  xpReqForPermLevel,
} from '../game/data/skills';

const initialState = {
  skills: SKILL_DATA,
};

// TODO (Long-term): Add a perm xp banking system where perm xp is not kept after rebirth unless you finish the action
// TODO: Add calculation for xp scaling
export const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addXpToSkill: (state, action) => {
      const { xp, name } = action.payload;
      const skill = state.skills[name];

      // Gain xp
      skill.currentXp += xp;
      skill.permXp += xp;

      // Check for level ups
      while (skill.currentXp >= skill.currentLevelXpReq) {
        skill.currentXp -= skill.currentLevelXpReq;
        skill.currentLevel += 1;
        skill.currentLevelXpReq = xpReqForCurrentLevel(skill.currentLevel);
      }

      while (skill.permXp >= skill.permLevelXpReq) {
        skill.permXp -= skill.permLevelXpReq;
        skill.permLevel += 1;
        skill.permLevelXpReq = xpReqForPermLevel(skill.permLevel);
      }

      skill.xpScaling =
        1 * 1.01 ** skill.permLevel * 1.05 ** skill.currentLevel;
    },
    resetSkillCurrentLevels: (state) => {
      state.skills.map((skill) => ({
        ...skill,
        currentLevel: 0,
        currentXp: 0,
        currentLevelXpReq: xpReqForCurrentLevel(0),
      }));
    },
  },
});

export const getSkills = (store) => store.skill.skills;

export const getSkillByName = (store) => (skillName) =>
  store.skill.skills[skillName];

export const { actions } = skillSlice;

export default skillSlice.reducer;
