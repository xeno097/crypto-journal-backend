import { ErrorCode } from './error-codes.enum';
import { IErrorDetail } from '../shared/interfaces/error-detail.interface';
import { IBaseError } from 'src/shared/interfaces/base-error.interface';

export abstract class BaseError extends Error implements IBaseError {
  code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR;
  message = 'An unexpected error occurred';
  errors: IErrorDetail[] = [];

  constructor() {
    super();

    Object.setPrototypeOf(this, BaseError);
  }
}
