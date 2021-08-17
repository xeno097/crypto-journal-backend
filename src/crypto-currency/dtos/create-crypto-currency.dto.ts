import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCryptoCurrencyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
