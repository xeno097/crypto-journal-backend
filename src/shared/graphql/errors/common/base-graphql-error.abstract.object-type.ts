import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorCode } from 'src/errors/error-codes.enum';
import { IBaseGraphqlError } from 'src/shared/interfaces/base-graphql-error.interface';
import { ErrorDetail } from './error-detail.object-type';

@ObjectType({ isAbstract: true })
export abstract class BaseGraphqlError implements IBaseGraphqlError {
  @Field(() => ErrorCode)
  code: ErrorCode;

  @Field()
  message: string;

  @Field(() => [ErrorDetail])
  errors: ErrorDetail[];

  errorType: any;
}
