import { IUpdateEntityDto } from 'src/shared/interfaces/update-entity-dto.interface';
import { UpdateCryptoCurrencyPayload } from './update-crypto-currency-payload.dto';

export class UpdateCryptoCurrencyDto implements IUpdateEntityDto {
  getOneEntityDto: {
    symbol: string;
  };
  updateEntityPayload: UpdateCryptoCurrencyPayload;
}
