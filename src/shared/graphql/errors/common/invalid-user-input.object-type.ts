import { ObjectType } from '@nestjs/graphql';
import { ErrorCode } from 'src/errors/error-codes.enum';
import { BaseGraphqlError } from './base-graphql-error.abstract.object-type';

@ObjectType()
export class InvalidUserInput extends BaseGraphqlError {
  code = ErrorCode.INVALID_USER_INPUT;
  errors = [];
  message = 'Invalid User Input';
  errorType = InvalidUserInput;
}
