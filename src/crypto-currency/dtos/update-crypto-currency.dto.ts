import { IUpdateEntityDto } from 'src/shared/interfaces/update-entity-dto.interface';
import { GetCryptoCurrencyBySymbolDto } from './get-crypto-currency-by-symbol.dto';
import { UpdateCryptoCurrencyPayload } from './update-crypto-currency-payload.dto';

export class UpdateCryptoCurrencyDto implements IUpdateEntityDto {
  getOneEntityDto: GetCryptoCurrencyBySymbolDto;
  updateEntityPayload: UpdateCryptoCurrencyPayload;
}
