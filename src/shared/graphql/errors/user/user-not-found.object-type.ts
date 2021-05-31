import { ObjectType } from '@nestjs/graphql';
import { ErrorCode } from 'src/errors/error-codes.enum';
import { BaseGraphqlError } from 'src/shared/graphql/errors/common/base-graphql-error.abstract.object-type';

@ObjectType()
export class UserNotFound extends BaseGraphqlError {
  message = 'User not found';
  code = ErrorCode.USER_NOT_FOUND;
  errors = [];
  errorType = UserNotFound;
}
