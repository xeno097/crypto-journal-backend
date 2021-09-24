import { createUnionType } from '@nestjs/graphql';
import { ApiError } from 'src/shared/graphql/object-types/api-error.object-type';
import { TransactionType } from '../object-types/transaction.object-type';

export const TransactionResultName = 'TransactionResult';

export const TransactionResult = createUnionType({
  name: TransactionResultName,
  types: () => [TransactionType, ApiError],
  resolveType: value => {
    if (value instanceof ApiError) {
      return ApiError;
    }

    return TransactionType;
  },
});
