import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationResolver } from './operation.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OperationEntity,
  OperationEntitySchema,
} from './database/operation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OperationEntity.name,
        schema: OperationEntitySchema,
      },
    ]),
  ],
  providers: [OperationService, OperationResolver],
})
export class OperationModule {}
