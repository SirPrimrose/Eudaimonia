import { JOB_BASES } from './jobs';

const createJob = (jobName) => ({
  name: jobName,
  ...JOB_BASES[jobName],
});

// eslint-disable-next-line import/prefer-default-export
export { createJob };
