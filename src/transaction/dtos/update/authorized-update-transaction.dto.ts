import { JwtPayloadDto } from 'src/auth/dtos/jwt-payload.dto';
import { IAuthorizedOperationDto } from 'src/shared/interfaces/authorized-operation-dto.interface';
import { AuthorizedUpdateTransactionPayloadDto } from './authorized-update-transaction-payload.dto';

export class AuthorizedUpdateTransactionDto implements IAuthorizedOperationDto {
  jwtPayloadDto: JwtPayloadDto;
  operationDto: AuthorizedUpdateTransactionPayloadDto;
}
