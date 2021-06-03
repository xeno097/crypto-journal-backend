import { ISignInDto } from '../interfaces/dtos/sign-in-dto.interface';

export class SignInDto implements ISignInDto {
  token: string;
}
