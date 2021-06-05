import { UserRoles } from 'src/shared/enums/user-roles.enum';

export interface ICreateUserDto {
  userName: string;
  profilePicture?: string;
  email: string;
  role?: UserRoles;
}
