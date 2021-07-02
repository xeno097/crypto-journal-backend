import { IRefreshTokenDto } from '../interfaces/dtos/refresh-token-dto.interface';

export class RefreshTokenDto implements IRefreshTokenDto {
  token: string;
}
