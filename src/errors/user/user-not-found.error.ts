import { BaseError } from '../base-error.abstract-error';
import { ErrorCode } from '../error-codes.enum';

export class UserNotFoundError extends BaseError {
  code = ErrorCode.USER_NOT_FOUND;
  message = 'User not found';

  constructor() {
    super();

    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
