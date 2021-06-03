import { IUserDto } from 'src/user/interfaces/dtos/user-dto.interface';

export interface IAuthPayloadDto {
  accessToken: string;
  refreshToken: string;
  user: IUserDto;
}
