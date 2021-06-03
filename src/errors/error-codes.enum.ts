import { registerEnumType } from '@nestjs/graphql';

export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 'internal-server-error',
  INVALID_USER_INPUT = 'invalid-user-input',
  USER_NOT_FOUND = 'user-not-found',
  INVALID_SIGN_IN_TOKEN = 'invalid-signin-token',
  INVALID_JWT_FORMAT = 'invalid-jwt-format',
  EXPIRED_JWT = 'expired-jwt',
}

registerEnumType(ErrorCode, {
  name: 'ErrorCode',
});
