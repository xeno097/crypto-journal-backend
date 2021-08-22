import { Types } from 'mongoose';
import { cryptoCurrencyCollectionName } from 'src/crypto-currency/database/crypto-currency.entity';
import { OperationType } from 'src/operation/enums/operation-type.enum';

export const holdingAggregationPipeline = (userId: string) => [
  {
    $match: {
      user: Types.ObjectId(userId),
    },
  },
  {
    $group: {
      _id: '$cryptoCurrency',
      buyCoins: {
        $sum: {
          $cond: [
            {
              $eq: ['$operationType', OperationType.BUY],
            },
            '$coins',
            0,
          ],
        },
      },
      sellCoins: {
        $sum: {
          $cond: [
            {
              $eq: ['$operationType', OperationType.SELL],
            },
            '$coins',
            0,
          ],
        },
      },
    },
  },
  {
    $lookup: {
      from: cryptoCurrencyCollectionName,
      localField: '_id',
      foreignField: '_id',
      as: 'cryptoCurrency',
    },
  },
  {
    $project: {
      holding: {
        $subtract: ['$buyCoins', '$sellCoins'],
      },
      cryptoCurrency: {
        $cond: {
          if: {
            $gt: [
              {
                $size: '$cryptoCurrency',
              },
              0,
            ],
          },
          then: {
            $first: '$cryptoCurrency',
          },
          else: null,
        },
      },
    },
  },
  {
    $match: {
      cryptoCurrency: {
        $ne: null,
      },
    },
  },
  {
    $project: {
      id: '$cryptoCurrency.symbol',
      holding: 1,
      value: {
        $multiply: ['$cryptoCurrency.price', '$holding'],
      },
      symbol: '$cryptoCurrency.symbol',
      name: '$cryptoCurrency.name',
      icon: '$cryptoCurrency.icon',
      price: '$cryptoCurrency.price',
    },
  },
];
