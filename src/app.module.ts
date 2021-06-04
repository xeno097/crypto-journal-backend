import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { formatExpressGraphqlCtx } from './shared/graphql/utils/format-graphql-ctx.util';
import { EnvKey } from './shared/enums/env-keys.enum';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
