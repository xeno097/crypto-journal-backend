import { BaseError } from './base-error.abstract-error';
import { ErrorCode } from './error-codes.enum';

export class InvalidTokenError extends BaseError {
  code = ErrorCode.INVALID_SIGN_IN_TOKEN;
  message = 'Invalid sign in token';

  constructor() {
    super();

    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }
}
