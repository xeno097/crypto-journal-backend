import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ErrorDetail {
  @Field({ nullable: true })
  field?: string;

  @Field()
  message: string;
}
