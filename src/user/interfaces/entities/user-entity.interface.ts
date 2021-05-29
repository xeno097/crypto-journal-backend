import { UserRoles } from 'src/shared/enums/user-roles.enum';

export interface IUserEntity {
  userName: string;
  profilePicture?: string;
  email: string;
  role: UserRoles;
}
