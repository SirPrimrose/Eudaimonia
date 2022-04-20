import { JOB_BASES } from './jobs';

// May not need this in the future, right now passing ALL details to job queue, whereas really we should only pass what job queue needs
const createJobQueueEntry = (jobName) => ({
  name: jobName,
  ...JOB_BASES[jobName],
});

// eslint-disable-next-line import/prefer-default-export
export { createJobQueueEntry };
