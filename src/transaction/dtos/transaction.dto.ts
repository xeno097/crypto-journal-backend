import { CryptoCurrencyDto } from 'src/crypto-currency/dtos/crypto-currency.dto';
import { OperationType } from 'src/operation/enums/operation-type.enum';
import { ITransactionDto } from '../interfaces/dtos/transaction-dto.interface';

export class TransactionDto implements ITransactionDto {
  id: string;
  coinSymbol: string;
  coins: number;
  cost: number;
  fee: number;
  coinPrice: number;
  date: string;
  operationType: OperationType;
  user: string;
  operation: string;
  cryptoCurrency: CryptoCurrencyDto;
}
