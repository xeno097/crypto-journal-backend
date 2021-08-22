export class AuthorizedCreateTransactionPayloadDto {
  coinSymbol: string;
  coins: number;
  fee: number;
  coinPrice: number;
  date: string;
  operation: string;
}
