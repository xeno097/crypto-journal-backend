import { UserRoles } from 'src/shared/enums/user-roles.enum';

export interface IJwtPayloadDto {
  id: string;
  email: string;
  role: UserRoles;
}
