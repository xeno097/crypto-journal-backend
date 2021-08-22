import { holdingAggregationPipeline } from './holding-aggregation-pipeline';

export const balanceAggregationPipeline = (userId: string) => {
  return [
    ...holdingAggregationPipeline(userId),
    {
      $group: {
        _id: null,
        balance: {
          $sum: '$value',
        },
      },
    },
  ];
};
