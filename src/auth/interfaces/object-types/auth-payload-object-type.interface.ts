import { IUserType } from 'src/user/interfaces/object-types/user-object-type.interface';

export interface IAuthPayloadType {
  accessToken: string;
  refreshToken: string;
  user: IUserType;
}
