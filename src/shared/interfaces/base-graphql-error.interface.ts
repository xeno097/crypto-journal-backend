import { ErrorCode } from '../../errors/error-codes.enum';
import { IErrorDetail } from './error-detail.interface';

export interface IBaseGraphqlError {
  code: ErrorCode;
  message: string;
  errors: IErrorDetail[];
  errorType: any;
}
