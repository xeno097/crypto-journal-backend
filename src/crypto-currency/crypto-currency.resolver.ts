import { Resolver, Query, Args } from '@nestjs/graphql';
import { FieldName } from 'src/shared/enums/input-fields.enum';
import { idFieldOptions } from 'src/shared/graphql/options/id-input-field.options';
import { getError } from 'src/shared/graphql/utils/get-graphql-error.util';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CryptoCurrencyResult } from './graphql/union-types/crypto-currency-result.union-type';

@Resolver()
export class CryptoCurrencyResolver {
  constructor(private readonly cryptoCurrencyService: CryptoCurrencyService) {}

  @Query(() => CryptoCurrencyResult)
  public async getCryptoCurrencyById(
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof CryptoCurrencyResult> {
    const [
      err,
      res,
    ] = await this.cryptoCurrencyService.getOneCryptoCurrencyById({ id });

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Query(() => [CryptoCurrencyResult])
  public async getCryptoCurrencies(): Promise<
    Array<typeof CryptoCurrencyResult>
  > {
    const [
      err,
      res,
    ] = await this.cryptoCurrencyService.getAllCryptoCurrencies();

    if (err) {
      return [getError(err)];
    }

    return res;
  }
}
