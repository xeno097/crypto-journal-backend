import { ErrorCode } from './error-codes.enum';
import { BaseError } from './base-error.abstract-error';

export class UserNotFoundError extends BaseError {
  code = ErrorCode.USER_NOT_FOUND;
  message = 'User not found';

  constructor() {
    super();

    Object.setPrototypeOf(this, UserNotFoundError);
  }
}
