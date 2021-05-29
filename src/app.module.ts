import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: './config/.env' }),
    MongooseModule.forRoot(process.env.DB_URI),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true,
    //   context: ({ req, res }) => {
    //     return req;
    //   },
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
