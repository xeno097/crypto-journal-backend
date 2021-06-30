import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface ICreateTransactionDto {
  coinSymbol: string;
  coins: number;
  cost: number;
  fee: number;
  coinPrice: number;
  date: string;
  operationType: OperationType;
  user: string;
  operation: string;
}
