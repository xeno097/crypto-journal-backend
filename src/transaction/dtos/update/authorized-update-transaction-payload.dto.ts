import { GetEntityByIdDto } from 'src/shared/dtos/get-entity-by-id.dto';

export class AuthorizedUpdateTransactionPayloadDto {
  where: GetEntityByIdDto;
  data: {
    coinSymbol?: string;
    coins?: number;
    cost?: number;
    fee?: number;
    coinPrice?: number;
    date?: string;
    operation?: string;
  };
}
