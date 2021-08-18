import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';
import { CryptoCurrencyDto } from '../dtos/crypto-currency.dto';
import { ICryptoCurrencyDto } from '../interfaces/crypto-currency-dto.interface';

@Schema({
  collection: 'crypto_currency',
  timestamps: true,
})
export class CryptoCurrencyEntity extends Document
  implements ICryptoCurrencyDto, IBaseEntity {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: null })
  icon?: string;

  static toDto(input: CryptoCurrencyEntity): CryptoCurrencyDto {
    return {
      id: input.id,
      icon: input.icon,
      price: input.price,
      symbol: input.symbol,
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
