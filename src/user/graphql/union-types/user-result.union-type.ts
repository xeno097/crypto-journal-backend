import { createUnionType } from '@nestjs/graphql';
import { ApiError } from 'src/shared/graphql/object-types/api-error.object-type';
import { UserType } from '../object-types/user.object-type';

export const UserResultName = 'UserResult';

export const UserResult = createUnionType({
  name: UserResultName,
  types: () => [UserType, ApiError],
  resolveType: value => {
    if (value instanceof ApiError) {
      return ApiError;
    }

    return UserType;
  },
});
