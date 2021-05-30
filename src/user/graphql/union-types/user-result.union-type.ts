import { createUnionType } from '@nestjs/graphql';
import { UserType } from '../object-types/user.object-type';

export const UserResultName = 'UserResult';

export const UserResult = createUnionType({
  name: UserResultName,
  types: () => [UserType],
});
