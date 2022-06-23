import { v4 as uuid } from 'uuid';

// Later this can be used to inject specific details about the job to be used for rendering in the component
const createJobQueueEntry = (jobId) => ({
  queueId: uuid(),
  jobId,
});

// eslint-disable-next-line import/prefer-default-export
export { createJobQueueEntry };
