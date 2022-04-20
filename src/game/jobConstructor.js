// Later this can be used to inject specific details about the job to be used for rendering in the component
const createJobQueueEntry = (jobName) => ({
  name: jobName,
});

// eslint-disable-next-line import/prefer-default-export
export { createJobQueueEntry };
