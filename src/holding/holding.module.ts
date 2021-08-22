import { Module } from '@nestjs/common';
import { TransactionModule } from 'src/transaction/transaction.module';
import { HoldingResolver } from './holding.resolver';
import { HoldingService } from './holding.service';

@Module({
  imports: [TransactionModule],
  providers: [HoldingResolver, HoldingService],
})
export class HoldingModule {}
