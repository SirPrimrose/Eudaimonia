import { SKILLS } from './consts';

const JOB_NAMES = {
  PACE: 'Pace',
};

const JOB_BASES = {
  [JOB_NAMES.PACE]: {
    skill: SKILLS.AGILITY,
    currentXp: 0,
    maxXp: 20,
  },
};

export { JOB_NAMES, JOB_BASES };
