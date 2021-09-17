import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CryptoCurrencyService } from './crypto-currency/crypto-currency.service';
import { EnvKey } from './shared/enums/env-keys.enum';
import { GraphqlExceptionFilter } from './shared/filters/graphql-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cryptoCurrencyService = app.get<CryptoCurrencyService>(
    CryptoCurrencyService,
  );

  await cryptoCurrencyService.updateCryptoCurrencyData();

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get(EnvKey.PORT);

  app.useGlobalFilters(new GraphqlExceptionFilter());

  await app.listen(port);
}
bootstrap();
