import { UserRoles } from 'src/shared/enums/user-roles.enum';

export interface IUserDto {
  id: string;
  userName: string;
  profilePicture?: string;
  email: string;
  role: UserRoles;
}
