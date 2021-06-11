import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationResolver } from './operation.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OperationEntity,
  OperationEntitySchema,
} from './database/operation.entity';
import { OperationRepository } from './operation.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperationEntity.name,
        schema: OperationEntitySchema,
      },
    ]),
  ],
  providers: [OperationService, OperationResolver, OperationRepository],
})
export class OperationModule {}
