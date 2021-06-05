import { BaseError } from '../base-error.abstract-error';
import { ErrorCode } from '../error-codes.enum';

export class JwtExpiredError extends BaseError {
  code = ErrorCode.EXPIRED_JWT;
  message = 'Expired jwt';

  constructor() {
    super();

    Object.setPrototypeOf(this, JwtExpiredError.prototype);
  }
}
