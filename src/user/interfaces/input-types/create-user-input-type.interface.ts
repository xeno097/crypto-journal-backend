import { UserRoles } from 'src/shared/enums/user-roles.enum';

export interface ICreateUserInputType {
  userName: string;
  profilePicture?: string;
  email: string;
  role?: UserRoles;
}
