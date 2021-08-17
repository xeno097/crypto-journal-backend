import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CryptoCurrency } from './entities/crypto-currency.entity';

@Resolver(() => CryptoCurrency)
export class CryptoCurrencyResolver {
  constructor(private readonly cryptoCurrencyService: CryptoCurrencyService) {}

  @Query(() => [CryptoCurrency], { name: 'cryptoCurrency' })
  findAll() {
    return this.cryptoCurrencyService.findAll();
  }

  @Query(() => CryptoCurrency, { name: 'cryptoCurrency' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cryptoCurrencyService.findOne(id);
  }
}
