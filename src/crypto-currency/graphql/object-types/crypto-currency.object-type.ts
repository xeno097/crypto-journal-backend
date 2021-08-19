import { Field, ObjectType } from '@nestjs/graphql';
import { ICryptoCurrencyDto } from 'src/crypto-currency/interfaces/crypto-currency-dto.interface';

export const cryptoCurrencyTypeName = 'CryptoCurrency';

@ObjectType(cryptoCurrencyTypeName)
export class CryptoCurrencyType implements ICryptoCurrencyDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  icon?: string;

  lastUpdated: number;
}
