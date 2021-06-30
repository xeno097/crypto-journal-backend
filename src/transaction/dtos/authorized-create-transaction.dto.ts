import { JwtPayloadDto } from 'src/auth/dtos/jwt-payload.dto';
import { IAuthorizedOperationDto } from 'src/shared/interfaces/authorized-operation-dto.interface';
import { AuthorizedCreateTransactionPayloadDto } from './authorized-create-transaction-payload.dto';

export class AuthorizedCreateTransactionDto implements IAuthorizedOperationDto {
  jwtPayloadDto: JwtPayloadDto;
  operationDto: AuthorizedCreateTransactionPayloadDto;
}
