import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface IUpdateTransactionPayoadDto {
  coinSymbol?: string;
  coins?: number;
  fee?: number;
  coinPrice?: number;
  date?: string;
  operationType?: OperationType;
  operation?: string;
}
