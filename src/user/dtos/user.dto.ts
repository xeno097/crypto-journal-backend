import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { IUserDto } from '../interfaces/dtos/user-dto.interface';

export class UserDto implements IUserDto {
  id: string;
  userName: string;
  profilePicture?: string;
  email: string;
  role: UserRoles;
}
