import { createUnionType } from '@nestjs/graphql';
import { ApiError } from 'src/shared/graphql/object-types/api-error.object-type';
import { HoldingType } from '../object-types/holding.object-type';

export const HoldingResultName = 'HoldingResult';

export const HoldingResult = createUnionType({
  name: HoldingResultName,
  types: () => [HoldingType, ApiError],
  resolveType: value => {
    if (value.code) {
      return ApiError;
    }

    return HoldingType;
  },
});
