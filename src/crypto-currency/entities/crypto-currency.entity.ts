import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CryptoCurrency {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
