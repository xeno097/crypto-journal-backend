import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { ICreateUserDto } from '../interfaces/dtos/create-user-dto.interface';

export class CreateUserDto implements ICreateUserDto {
  userName: string;
  profilePicture?: string;
  email: string;
  role?: UserRoles;
}
