import { IUpdateEntityDto } from 'src/shared/interfaces/update-entity-dto.interface';
import { UpdateTransactionPayloadDto } from './update-transaction-payload.dto';

export class UpdateTransactionDto implements IUpdateEntityDto {
  getOneEntityDto: Record<string, any>;
  updateEntityPayload: UpdateTransactionPayloadDto;
}
