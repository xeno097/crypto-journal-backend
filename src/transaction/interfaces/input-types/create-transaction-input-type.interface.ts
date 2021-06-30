export interface ICreateTransactionInputType {
  coinSymbol: string;
  coins: number;
  cost: number;
  fee: number;
  coinPrice: number;
  date: string;
  operation: string;
}
