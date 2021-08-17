import { Module } from '@nestjs/common';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CryptoCurrencyResolver } from './crypto-currency.resolver';
import { CryptoCurrencyRepository } from './crypto-currency.repository';

@Module({
  providers: [
    CryptoCurrencyResolver,
    CryptoCurrencyService,
    CryptoCurrencyRepository,
  ],
})
export class CryptoCurrencyModule {}
