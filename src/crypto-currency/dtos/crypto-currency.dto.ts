import { ICryptoCurrencyDto } from '../interfaces/crypto-currency-dto.interface';

export class CryptoCurrencyDto implements ICryptoCurrencyDto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  icon: string;
  lastUpdated: number;
}
