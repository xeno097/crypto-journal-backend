import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../enums/user-roles.enum';

export const AUTHORIZED_ROLES_KEY = 'AUTHORIZED_ROLES';

export const AuthorizedRoles = (...authorizedRoles: UserRoles[]) =>
  SetMetadata(AUTHORIZED_ROLES_KEY, authorizedRoles);
