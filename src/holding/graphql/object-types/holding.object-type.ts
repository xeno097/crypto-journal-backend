import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IHoldingDto } from 'src/holding/interfaces/holding-dto.interface';

export const holdingTypeName = 'Holding';

@ObjectType(holdingTypeName)
export class HoldingType implements IHoldingDto {
  @Field(() => ID)
  id: string;

  @Field()
  holding: number;

  @Field()
  symbol: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  icon?: string;

  @Field()
  value: number;

  @Field()
  price: number;
}
