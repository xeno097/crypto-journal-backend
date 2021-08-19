import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { formatExpressGraphqlCtx } from './shared/graphql/utils/format-graphql-ctx.util';
import { EnvKey } from './shared/enums/env-keys.enum';
import { CommonJwtModule } from './common-jwt/common-jwt.module';
import { OperationModule } from './operation/operation.module';
import { GqlExceptionFilter } from './shared/filters/graphql-exception.filter';
import { TransactionModule } from './transaction/transaction.module';
import { CryptoCurrencyModule } from './crypto-currency/crypto-currency.module';
import { CoinApiModule } from './coin-api/coin-api.module';

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
    EmailModule,
    AuthModule,
    CommonJwtModule,
    OperationModule,
    TransactionModule,
    CryptoCurrencyModule,
    CoinApiModule,
  ],
  controllers: [],
  providers: [GqlExceptionFilter],
})
export class AppModule {}
