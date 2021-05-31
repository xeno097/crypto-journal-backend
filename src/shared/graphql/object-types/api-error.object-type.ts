import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorCode } from 'src/errors/error-codes.enum';
import { IBaseError } from 'src/shared/interfaces/base-error.interface';
import { ErrorDetail } from './error-detail.object-type';

@ObjectType()
export class ApiError implements IBaseError {
  @Field(() => ErrorCode)
  code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR;

  @Field(() => String)
  message = 'An unexpected error occured';

  @Field(() => [ErrorDetail])
  errors: ErrorDetail[] = [];
}
