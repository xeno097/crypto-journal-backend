import { ApiError } from '../object-types/api-error.object-type';

export const getError = (err: any): ApiError => {
  if (err.code) {
    return {
      code: err.code,
      errors: err.errors,
      message: err.message,
    };
  }

  return new ApiError();
};
