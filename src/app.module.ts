import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './config/.env' }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req, res }) => {
        return req;
      },
    }),
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
