import { IJwtPayloadDto } from 'src/auth/interfaces/dtos/jwt-payload-dto.interface';

export interface IAuthorizedOperationDto {
  jwtPayloadDto: IJwtPayloadDto;
  operationDto: Record<string, any>;
}
