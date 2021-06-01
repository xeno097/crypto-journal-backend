import { registerEnumType } from '@nestjs/graphql';

export enum UserRoles {
  ADMIN = 'makuta',
  USER = 'matoran',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});
