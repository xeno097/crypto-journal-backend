import { IBalanceDto } from '../interfaces/balance-dto.interface';

export class BalanceDto implements IBalanceDto {
  id: string;
  cryptoCurrency: string;
  cryptoValue: number;
  balance: number;
}
