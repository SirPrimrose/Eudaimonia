/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SKILL_BASES } from '../game/data/skills';

const initialState = {
  skills: SKILL_BASES,
};

export const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addXpToSkill: (state, action) => {
      const { xp, name } = action.payload;
      const skill = state.skills[name];
      skill.currentXp += xp;
      // Check if xp high enough to gain level
      while (skill.currentXp >= 100) {
        skill.currentXp -= 100;
        skill.currentLevel += 1;
      }
    },
    resetSkillCurrentLevels: (state) => {
      state.skills.map((skill) => ({
        ...skill,
        currentLevel: 0,
        currentXp: 0,
      }));
    },
  },
});

export const getSkills = (store) => store.skills.skills;

export const getSkillByName = (store) => (skillName) =>
  store.skills.skills[skillName];

export const { actions } = skillSlice;

export default skillSlice.reducer;
