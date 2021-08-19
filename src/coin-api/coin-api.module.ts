import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from 'src/shared/enums/env-keys.enum';
import { CoinApiRepository } from './coin-api.repository';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const baseURL = configService.get(EnvKey.COIN_API_BASE_URL);
        const apiKey = configService.get(EnvKey.COIN_API_KEY);

        return {
          baseURL,
          headers: {
            'X-CoinAPI-Key': apiKey,
          },
        };
      },
    }),
  ],
  providers: [CoinApiRepository],
  exports: [CoinApiRepository],
})
export class CoinApiModule {}
