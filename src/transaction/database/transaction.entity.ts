import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { CryptoCurrencyEntity } from 'src/crypto-currency/database/crypto-currency.entity';
import { OperationType } from 'src/operation/enums/operation-type.enum';
import { TransactionDto } from '../dtos/transaction.dto';
import { ITransactionDto } from '../interfaces/dtos/transaction-dto.interface';

@Schema({
  collection: 'transaction',
  timestamps: true,
})
export class TransactionEntity extends Document implements ITransactionDto {
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

  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: CryptoCurrencyEntity.name,
    required: true,
  })
  cryptoCurrency: CryptoCurrencyEntity;

  @Prop({ required: true, type: MongoSchema.Types.ObjectId })
  operation: string;

  cost: number;

  static toDto(input: TransactionEntity): TransactionDto {
    const {
      coinPrice,
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
      coinSymbol: input.cryptoCurrency.symbol,
      coins,
      cost: coinPrice * coins + fee,
      date,
      fee,
      id,
      operation,
      operationType,
      user,
      cryptoCurrency: CryptoCurrencyEntity.toDto(input.cryptoCurrency),
    };
  }
}

export const TransactionEntitySchema = SchemaFactory.createForClass(
  TransactionEntity,
);

TransactionEntitySchema.pre(/^find/, function(next) {
  this.populate({ path: 'cryptoCurrency' });

  next();
});

TransactionEntitySchema.pre('validate', function(next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
