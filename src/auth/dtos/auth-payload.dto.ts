import { IUserDto } from 'src/user/interfaces/dtos/user-dto.interface';
import { IAuthPayloadDto } from '../interfaces/dtos/auth-payload-dto.interface';

export class AuthPayloadDto implements IAuthPayloadDto {
  accessToken: string;
  refreshToken: string;
  user: IUserDto;
}
