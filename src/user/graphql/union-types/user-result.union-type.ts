import { createUnionType } from '@nestjs/graphql';
import { InternalServerErrorType } from 'src/shared/graphql/errors/common/internal-server-error.object-type';
import { UserNotFound } from '../../../shared/graphql/errors/user/user-not-found.object-type';
import { UserType } from '../object-types/user.object-type';

export const UserResultName = 'UserResult';

export const UserResult = createUnionType({
  name: UserResultName,
  types: () => [UserType, UserNotFound, InternalServerErrorType],
  resolveType: value => {
    if (value.errorType) {
      return value.errorType;
    }

    return UserType;
  },
});
