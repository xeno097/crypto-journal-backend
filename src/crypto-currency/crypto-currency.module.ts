import { Module } from '@nestjs/common';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CryptoCurrencyResolver } from './crypto-currency.resolver';
import { CryptoCurrencyRepository } from './crypto-currency.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CryptoCurrencyEntity,
  CryptoCurrencyEntitySchema,
} from './database/crypto-currency.entity';
import { CoinApiModule } from 'src/coin-api/coin-api.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CryptoCurrencyEntity.name,
        schema: CryptoCurrencyEntitySchema,
      },
    ]),
    CoinApiModule,
  ],
  providers: [
    CryptoCurrencyResolver,
    CryptoCurrencyService,
    CryptoCurrencyRepository,
  ],
  exports: [CryptoCurrencyRepository],
})
export class CryptoCurrencyModule {}
