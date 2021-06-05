import { Logger } from '@nestjs/common';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { ApiError } from '../object-types/api-error.object-type';

export const getError = (err: any): ApiError => {
  const logger: Logger = new Logger();
  logger.log(err);

  if (err instanceof BaseError) {
    return {
      code: err.code,
      errors: err.errors,
      message: err.message,
    };
  }

  return new ApiError();
};
