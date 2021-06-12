import { ErrorCode } from './error-codes.enum';
import { IErrorDetail } from '../shared/interfaces/error-detail.interface';
import { IBaseError } from 'src/shared/interfaces/base-error.interface';

export abstract class BaseError extends Error implements IBaseError {
  code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR;
  message = 'An unexpected error occurred';
  errors: IErrorDetail[] = [];

  constructor() {
    super();

    Object.setPrototypeOf(this, BaseError.prototype);
  }

  protected getErrorMessage(context: string, reason: string) {
    const _message = `[${context.toUpperCase()}]: ${reason}`;

    this.message =
      process.env?.NODE_ENV !== 'production' ? _message : this.message;
  }
}
