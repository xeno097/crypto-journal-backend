export interface ICryptoCurrencyDto {
  id: string;
  name: string;
  symbol: string;
  price: number;
  icon?: string;
  lastUpdated: number;
}
