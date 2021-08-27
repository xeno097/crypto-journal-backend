import { holdingAggregationPipeline } from './holding-aggregation-pipeline';

export const BALANCE_DEFAULT_CRYPTO_CURRENCY = 'BTC';

export const balanceAggregationPipeline = (
  userId: string,
  cryptoCurrency = BALANCE_DEFAULT_CRYPTO_CURRENCY,
) => {
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
    {
      $project: {
        _id: 0,
        id: cryptoCurrency,
        balance: 1,
        cryptoCurrency: cryptoCurrency,
      },
    },
    {
      $lookup: {
        from: 'crypto_currency',
        localField: 'cryptoCurrency',
        foreignField: 'symbol',
        as: 'currency',
      },
    },
    {
      $project: {
        id: 1,
        balance: 1,
        cryptoCurrency: 1,
        currency: {
          $cond: {
            if: {
              $gt: [
                {
                  $size: '$currency',
                },
                0,
              ],
            },
            then: {
              $first: '$currency',
            },
            else: {
              price: 1,
            },
          },
        },
      },
    },
    {
      $project: {
        id: 1,
        balance: 1,
        cryptoCurrency: 1,
        cryptoValue: {
          $divide: ['$balance', '$currency.price'],
        },
      },
    },
  ];
};
