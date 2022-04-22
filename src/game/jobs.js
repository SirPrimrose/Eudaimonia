import { SKILLS } from './consts';

const JOB_NAMES = {
  PACE: 'Pace',
  WANDER: 'Wander',
};

const JOB_BASES = {
  [JOB_NAMES.PACE]: {
    skill: SKILLS.AGILITY,
    currentXp: 0,
    maxXp: 20,
    currentValue: 0,
    maxValue: 10,
  },
  [JOB_NAMES.WANDER]: {
    skill: SKILLS.AGILITY,
    currentXp: 0,
    maxXp: 50,
    currentValue: 0,
    maxValue: 10,
  },
};

export { JOB_NAMES, JOB_BASES };
