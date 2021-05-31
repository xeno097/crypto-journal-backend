import { IBaseGraphqlError } from 'src/shared/interfaces/base-graphql-error.interface';
import { UserNotFound } from 'src/shared/graphql/errors/user/user-not-found.object-type';
import { ErrorCode } from 'src/errors/error-codes.enum';
import { InternalServerErrorType } from '../common/internal-server-error.object-type';
import { InvalidUserInput } from '../common/invalid-user-input.object-type';

const errorsMap: Record<ErrorCode, any> = {
  'internal-server-error': InternalServerErrorType,
  'invalid-user-input': InvalidUserInput,
  'user-not-found': UserNotFound,
};

export const getError = (err: any): IBaseGraphqlError => {
  if (err.code) {
    return {
      code: err.code,
      errorType: errorsMap[err.code],
      errors: err.errors,
      message: err.message,
    };
  }

  return new InternalServerErrorType();
};
