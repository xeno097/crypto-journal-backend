import { IAuthorizedCreateTransactionPayloadDto } from '../../interfaces/dtos/authorized-create-transaction-payload-dto.interface';

export class AuthorizedCreateTransactionPayloadDto
  implements IAuthorizedCreateTransactionPayloadDto {
  coinSymbol: string;
  coins: number;
  fee: number;
  coinPrice: number;
  date: string;
  operation: string;
}
