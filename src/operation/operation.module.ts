import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationResolver } from './operation.resolver';

@Module({
  providers: [OperationService, OperationResolver]
})
export class OperationModule {}
