import { ObjectType } from '@nestjs/graphql';
import { ErrorCode } from 'src/errors/error-codes.enum';
import { BaseGraphqlError } from './base-graphql-error.abstract.object-type';

@ObjectType()
export class InternalServerErrorType extends BaseGraphqlError {
  message = 'An unexpected error occured';
  code = ErrorCode.INTERNAL_SERVER_ERROR;
  errorType = InternalServerErrorType;
  errors = [];
}
