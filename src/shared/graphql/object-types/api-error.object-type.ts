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

  constructor(err?: {
    code?: ErrorCode;
    errors?: ErrorDetail[];
    message?: string;
  }) {
    const { code, errors, message } = err;

    this.code = code ?? this.code;
    this.errors = errors ?? this.errors;
    this.message = message ?? this.message;
  }
}
