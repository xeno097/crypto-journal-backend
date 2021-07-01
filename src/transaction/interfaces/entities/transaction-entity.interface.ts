import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface ITransactionEntity {
  coinSymbol: string;
  coins: number;
  fee: number;
  coinPrice: number;
  date: string;
  operationType: OperationType;
  user: string;
  operation: string;
}
