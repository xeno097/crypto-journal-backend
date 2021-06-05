import { BaseError } from '../base-error.abstract-error';
import { ErrorCode } from '../error-codes.enum';

export class InvalidJwtFormatError extends BaseError {
  code = ErrorCode.INVALID_JWT_FORMAT;
  message = 'Invalid jwt format';

  constructor() {
    super();

    Object.setPrototypeOf(this, InvalidJwtFormatError.prototype);
  }
}
