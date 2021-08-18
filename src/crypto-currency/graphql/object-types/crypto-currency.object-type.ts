import { Field, ObjectType } from '@nestjs/graphql';
import { ICryptoCurrencyDto } from 'src/crypto-currency/interfaces/crypto-currency-dto.interface';
import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';

export const cryptoCurrencyTypeName = 'CryptoCurrency';

@ObjectType(cryptoCurrencyTypeName)
export class CryptoCurrencyType implements ICryptoCurrencyDto, IBaseEntity {
  @Field()
  id: string;

  @Field()
  symbol: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  icon?: string;
}
