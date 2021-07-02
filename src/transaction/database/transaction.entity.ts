import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { OperationType } from 'src/operation/enums/operation-type.enum';
import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';
import { TransactionDto } from '../dtos/transaction.dto';
import { ITransactionEntity } from '../interfaces/entities/transaction-entity.interface';

@Schema({
  collection: 'transaction',
  timestamps: true,
})
export class TransactionEntity extends Document
  implements ITransactionEntity, IBaseEntity {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  coinSymbol: string;

  @Prop({ required: true })
  coins: number;

  @Prop({ required: true })
  fee: number;

  @Prop({ required: true })
  coinPrice: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, enum: OperationType })
  operationType: OperationType;

  @Prop({ required: true, type: MongoSchema.Types.ObjectId })
  user: string;

  @Prop({ required: true, type: MongoSchema.Types.ObjectId })
  operation: string;

  static toDto(input: TransactionEntity): TransactionDto {
    const {
      coinPrice,
      coinSymbol,
      coins,
      date,
      fee,
      id,
      operation,
      operationType,
      user,
    } = input;

    return {
      coinPrice,
      coinSymbol,
      coins,
      cost: coinPrice * coins + fee,
      date,
      fee,
      id,
      operation,
      operationType,
      user,
    };
  }
}

export const TransactionEntitySchema = SchemaFactory.createForClass(
  TransactionEntity,
);

TransactionEntitySchema.pre('validate', function(next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
