import { SKILL_NAMES } from './skills';

const JOB_NAMES = {
  PACE: 'Pace',
  WANDER: 'Wander',
  COLLECT: 'Collect',
};

const JOB_BASES = {
  [JOB_NAMES.PACE]: {
    skill: SKILL_NAMES.AGILITY,
    currentXp: 0,
    maxXp: 20,
    currentValue: 0,
    maxValue: 10,
  },
  [JOB_NAMES.WANDER]: {
    skill: SKILL_NAMES.AGILITY,
    currentXp: 0,
    maxXp: 50,
    currentValue: 0,
    maxValue: 10,
  },
  [JOB_NAMES.COLLECT]: {
    skill: SKILL_NAMES.AGILITY,
    currentXp: 0,
    maxXp: 50,
    currentValue: 0,
    maxValue: 10,
  },
};

export { JOB_NAMES, JOB_BASES };
