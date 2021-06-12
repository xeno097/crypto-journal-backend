import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { TransactionRepository } from './transaction.repository';

@Module({
  providers: [TransactionResolver, TransactionService, TransactionRepository],
})
export class TransactionModule {}
