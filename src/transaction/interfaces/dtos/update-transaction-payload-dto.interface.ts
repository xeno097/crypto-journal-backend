import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface IUpdateTransactionPayoadDto {
  coins?: number;
  fee?: number;
  coinPrice?: number;
  date?: string;
  operationType?: OperationType;
  operation?: string;
  cryptoCurrency?: string;
}
