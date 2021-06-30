import { BaseError } from '../base-error.abstract-error';
import { ErrorCode } from '../error-codes.enum';

export class TransactionNotFoundError extends BaseError {
  code = ErrorCode.TRANSACTION_NOT_FOUND;
  message = 'Transaction not found';

  constructor() {
    super();

    Object.setPrototypeOf(this, TransactionNotFoundError.prototype);
  }
}
