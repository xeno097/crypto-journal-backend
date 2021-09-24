import { createUnionType } from '@nestjs/graphql';
import { ApiError } from 'src/shared/graphql/object-types/api-error.object-type';
import { CryptoCurrencyType } from '../object-types/crypto-currency.object-type';

export const CryptoCurrencyResultName = 'CryptoCurrencyResult';

export const CryptoCurrencyResult = createUnionType({
  name: CryptoCurrencyResultName,
  types: () => [CryptoCurrencyType, ApiError],
  resolveType: value => {
    if (value instanceof ApiError) {
      return ApiError;
    }

    return CryptoCurrencyType;
  },
});
