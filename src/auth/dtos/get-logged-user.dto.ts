import { IGetLoggedUserDto } from '../interfaces/dtos/get-logged-user-dto.interface';

export class GetLoggedUserDto implements IGetLoggedUserDto {
  id: string;
  email: string;
}
