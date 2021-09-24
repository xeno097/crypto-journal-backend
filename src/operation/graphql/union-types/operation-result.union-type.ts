import { createUnionType } from '@nestjs/graphql';
import { ApiError } from 'src/shared/graphql/object-types/api-error.object-type';
import { OperationType } from '../object-types/operation.object-type';

export const OperationResultName = 'OperationResult';

export const OperationResult = createUnionType({
  name: OperationResultName,
  types: () => [OperationType, ApiError],
  resolveType: value => {
    if (value instanceof ApiError) {
      return ApiError;
    }

    return OperationType;
  },
});
