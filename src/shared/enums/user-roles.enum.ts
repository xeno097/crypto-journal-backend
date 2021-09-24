import { registerEnumType } from '@nestjs/graphql';

// Little bionicle easter egg
export enum UserRoles {
  ADMIN = 'makuta',
  USER = 'matoran',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});
