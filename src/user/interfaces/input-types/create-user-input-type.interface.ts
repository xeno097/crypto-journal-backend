import { UserRoles } from 'src/shared/enums/user-roles.enum';

export interface ICreateUserInput {
  userName: string;
  profilePicture?: string;
  email: string;
  role: UserRoles;
}
