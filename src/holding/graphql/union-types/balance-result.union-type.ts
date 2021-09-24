import { createUnionType } from '@nestjs/graphql';
import { ApiError } from 'src/shared/graphql/object-types/api-error.object-type';
import { BalanceType } from '../object-types/balance.object-type';

export const BalanceResultName = 'BalanceResult';

export const BalanceResult = createUnionType({
  name: BalanceResultName,
  types: () => [BalanceType, ApiError],
  resolveType: value => {
    if (value instanceof ApiError) {
      return ApiError;
    }

    return BalanceType;
  },
});
