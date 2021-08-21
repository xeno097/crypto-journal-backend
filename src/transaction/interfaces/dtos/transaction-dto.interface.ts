import { ICryptoCurrencyDto } from 'src/crypto-currency/interfaces/crypto-currency-dto.interface';
import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface ITransactionDto {
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
  cryptoCurrency: ICryptoCurrencyDto;
}
