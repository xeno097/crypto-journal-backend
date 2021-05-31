import { ErrorCode } from 'src/errors/error-codes.enum';
import { IErrorDetail } from './error-detail.interface';

export interface IBaseError {
  code: ErrorCode;
  message: string;
  errors: IErrorDetail[];
}
