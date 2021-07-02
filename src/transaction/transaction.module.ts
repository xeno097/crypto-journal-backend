import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { TransactionRepository } from './transaction.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionEntity,
  TransactionEntitySchema,
} from './database/transaction.entity';
import { CommonJwtModule } from 'src/common-jwt/common-jwt.module';
import { OperationModule } from 'src/operation/operation.module';

@Module({
  imports: [
    CommonJwtModule,
    OperationModule,
    MongooseModule.forFeature([
      {
        name: TransactionEntity.name,
        schema: TransactionEntitySchema,
      },
    ]),
  ],
  providers: [TransactionResolver, TransactionService, TransactionRepository],
})
export class TransactionModule {}
