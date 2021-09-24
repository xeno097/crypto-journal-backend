import { Logger } from '@nestjs/common';
import { InvalidJwtFormatError } from 'src/errors/auth/invalid-jwt-format.error';
import { JwtExpiredError } from 'src/errors/auth/jwt-expired.error';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { ApiError } from '../object-types/api-error.object-type';

export const getError = (err: any): ApiError => {
  const logger: Logger = new Logger();
  logger.log(err);

  if (err.message === 'jwt malformed') {
    err = new InvalidJwtFormatError();
  }

  if (err.message === 'jwt expired') {
    err = new JwtExpiredError();
  }

  if (err instanceof BaseError) {
    return new ApiError(err);
  }

  return new ApiError();
};
