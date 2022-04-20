const JOB_NAMES = {
  PACE: 'Pace',
};

const pacing = (job) => {
  console.log('Do pacing');
  return 0.01;
};

const JOB_ACTIONS = {
  [JOB_NAMES.PACE]: pacing,
};

const createJob = (jobBase) => ({
  ...jobBase,
  progress: 0,
  maxProgress: 100,
});

// eslint-disable-next-line import/prefer-default-export
export { JOB_NAMES, JOB_ACTIONS, createJob };
