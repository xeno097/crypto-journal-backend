import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CryptoCurrencyType } from './graphql/object-types/crypto-currency.object-type';

@Resolver(() => CryptoCurrencyType)
export class CryptoCurrencyResolver {
  constructor(private readonly cryptoCurrencyService: CryptoCurrencyService) {}

  @Query(() => [CryptoCurrencyType], { name: 'cryptoCurrency' })
  findAll() {
    return this.cryptoCurrencyService.findAll();
  }

  @Query(() => CryptoCurrencyType, { name: 'cryptoCurrency' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cryptoCurrencyService.findOne(id);
  }
}
