import { OperationType } from 'src/operation/enums/operation-type.enum';
import { IUpdateTransactionPayoadDto } from '../interfaces/dtos/update-transaction-payload-dto.interface';

export class UpdateTransactionPayloadDto
  implements IUpdateTransactionPayoadDto {
  coinSymbol?: string;
  coins?: number;
  cost?: number;
  fee?: number;
  coinPrice?: number;
  date?: string;
  operationType?: OperationType;
  operation?: string;
}
