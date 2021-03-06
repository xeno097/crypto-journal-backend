import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { FieldName } from 'src/shared/enums/input-fields.enum';
import { FilterInputType } from 'src/shared/graphql/input-types/filter-input.input-type';
import { filterInputFieldOptions } from 'src/shared/graphql/options/filter-input-field.options';
import { stringFieldOptions } from 'src/shared/graphql/options/string-input-field.options';
import { getError } from 'src/shared/graphql/utils/get-graphql-error.util';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CryptoCurrencyType } from './graphql/object-types/crypto-currency.object-type';
import { CryptoCurrencyResult } from './graphql/union-types/crypto-currency-result.union-type';

@Resolver(() => CryptoCurrencyType)
@UseGuards(GqlAuthGuard)
export class CryptoCurrencyResolver {
  constructor(private readonly cryptoCurrencyService: CryptoCurrencyService) {}

  @Query(() => CryptoCurrencyResult)
  public async getCryptoCurrencyBySymbol(
    @Args(FieldName.INPUT, stringFieldOptions) symbol: string,
  ): Promise<typeof CryptoCurrencyResult> {
    const [
      err,
      res,
    ] = await this.cryptoCurrencyService.getOneCryptoCurrencyBySymbol({
      symbol,
    });

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Query(() => [CryptoCurrencyResult])
  public async searchCryptoCurrency(
    @Args(FieldName.INPUT, stringFieldOptions) input: string,
  ): Promise<Array<typeof CryptoCurrencyResult>> {
    const [err, res] = await this.cryptoCurrencyService.searchCryptoCurrency({
      searchString: input,
    });

    if (err) {
      return [getError(err)];
    }

    return res;
  }

  @Query(() => [CryptoCurrencyResult])
  public async getCryptoCurrencies(
    @Args(FieldName.INPUT, filterInputFieldOptions)
    filterInput: FilterInputType,
  ): Promise<Array<typeof CryptoCurrencyResult>> {
    const [err, res] = await this.cryptoCurrencyService.getCryptoCurrencies(
      filterInput,
    );

    if (err) {
      return [getError(err)];
    }

    return res;
  }
}
