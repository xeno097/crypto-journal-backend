import { Field, ObjectType } from '@nestjs/graphql';
import { IErrorDetail } from 'src/shared/interfaces/error-detail.interface';

@ObjectType()
export class ErrorDetail implements IErrorDetail {
  @Field({ nullable: true })
  field?: string;

  @Field()
  message: string;
}
