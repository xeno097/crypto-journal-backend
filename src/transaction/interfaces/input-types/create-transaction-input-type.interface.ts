export interface ICreateTransactionInputType {
  coinSymbol: string;
  coins: number;
  fee: number;
  coinPrice: number;
  date: string;
  operation: string;
}
