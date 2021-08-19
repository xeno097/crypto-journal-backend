import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CryptoCurrencyDto } from '../dtos/crypto-currency.dto';
import { ICryptoCurrencyDto } from '../interfaces/crypto-currency-dto.interface';
import { Document } from 'mongoose';

@Schema({
  collection: 'crypto_currency',
  timestamps: true,
})
export class CryptoCurrencyEntity extends Document
  implements ICryptoCurrencyDto {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  symbol: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: null })
  icon?: string;

  @Prop({ default: 0 })
  lastUpdated: number;

  static toDto(input: CryptoCurrencyEntity): CryptoCurrencyDto {
    return {
      id: input._id,
      name: input.name,
      icon: input.icon,
      price: input.price,
      symbol: input.symbol,
      lastUpdated: input.lastUpdated,
    };
  }
}

export const CryptoCurrencyEntitySchema = SchemaFactory.createForClass(
  CryptoCurrencyEntity,
);

CryptoCurrencyEntitySchema.pre('validate', function(next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});

CryptoCurrencyEntitySchema.index({
  name: 'text',
  symbol: 'text',
});
