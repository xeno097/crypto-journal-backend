import { BaseError } from './base-error.abstract-error';
import { ErrorCode } from './error-codes.enum';

export class BlockedUserError extends BaseError {
  code = ErrorCode.BLOCKED_USER;
  message = 'User is blocked';

  constructor() {
    super();

    Object.setPrototypeOf(this, BlockedUserError.prototype);
  }
}
