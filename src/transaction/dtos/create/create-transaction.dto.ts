import { OperationType } from 'src/operation/enums/operation-type.enum';
import { ICreateTransactionDto } from 'src/transaction/interfaces/dtos/create-transaction-dto.interface';

export class CreateTransactionDto implements ICreateTransactionDto {
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
