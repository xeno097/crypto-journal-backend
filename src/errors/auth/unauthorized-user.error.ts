import { BaseError } from '../base-error.abstract-error';
import { ErrorCode } from '../error-codes.enum';

export class UnauthorizedUserError extends BaseError {
  code = ErrorCode.UNAUTHORIZED_USER;
  message = 'Unauthorized user';

  constructor() {
    super();

    Object.setPrototypeOf(this, UnauthorizedUserError.prototype);
  }
}
