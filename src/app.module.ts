import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CoinApiModule } from './coin-api/coin-api.module';
import { CommonJwtModule } from './common-jwt/common-jwt.module';
import { CryptoCurrencyModule } from './crypto-currency/crypto-currency.module';
import { HoldingModule } from './holding/holding.module';
import { OperationModule } from './operation/operation.module';
import { EnvKey } from './shared/enums/env-keys.enum';
import { formatExpressGraphqlCtx } from './shared/graphql/utils/format-graphql-ctx.util';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: './config/.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => {
        const dbUri = configService.get(EnvKey.DB_URI);

        return {
          uri: dbUri,
          useFindAndModify: false,
          useCreateIndex: true,
        };
      },
    }),
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: formatExpressGraphqlCtx,
    }),
    AuthModule,
    CommonJwtModule,
    OperationModule,
    TransactionModule,
    CryptoCurrencyModule,
    CoinApiModule,
    HoldingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
