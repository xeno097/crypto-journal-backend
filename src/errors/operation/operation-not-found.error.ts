import { BaseError } from '../base-error.abstract-error';
import { ErrorCode } from '../error-codes.enum';

export class OperationNotFoundError extends BaseError {
  code = ErrorCode.OPERATION_NOT_FOUND;
  message = 'Operation not found';

  constructor() {
    super();

    Object.setPrototypeOf(this, OperationNotFoundError.prototype);
  }
}
