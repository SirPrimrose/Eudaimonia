const UNLOCK_CRITERIA = {
  LIMIT_COMPLETIONS: 'Limit_Completions', // # of completions allowed (default 1)
  JOB: 'Job', // {jobId: job id, amount: completion times (default 1)}
  EXPLORE_GROUP: 'Explore_Group', // {exploreGroupId: group id, exploration: % values (0-1)}
  ITEM: 'Item', // {itemId: item id, amount: item amount (default 1)}
  STAT: 'Stat', // {statId: stat id, threshold: % value (0-1)}
};

// eslint-disable-next-line import/prefer-default-export
export { UNLOCK_CRITERIA };
