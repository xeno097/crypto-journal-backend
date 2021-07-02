import { GetEntityByIdDto } from 'src/shared/dtos/get-entity-by-id.dto';
import { IUpdateEntityDto } from 'src/shared/interfaces/update-entity-dto.interface';
import { UpdateTransactionPayloadDto } from './update-transaction-payload.dto';

export class AuthorizedUpdateTransactionPayloadDto implements IUpdateEntityDto {
  getOneEntityDto: GetEntityByIdDto;
  updateEntityPayload: UpdateTransactionPayloadDto;
}
