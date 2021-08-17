import { CreateCryptoCurrencyInput } from './create-crypto-currency.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCryptoCurrencyInput extends PartialType(
  CreateCryptoCurrencyInput,
) {
  @Field(() => Int)
  id: number;
}
