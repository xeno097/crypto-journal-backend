import { registerEnumType } from '@nestjs/graphql';

export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 'internal-server-error',
  INVALID_USER_INPUT = 'invalid-user-input',
  USER_NOT_FOUND = 'user-not-found',
  INVALID_SIGN_IN_TOKEN = 'invalid-signin-token',
  INVALID_JWT_FORMAT = 'invalid-jwt-format',
  EXPIRED_JWT = 'expired-jwt',
  UNAUTHORIZED_USER = 'unauthorized-user',
  BLOCKED_USER = 'blocked-user',
  OPERATION_NOT_FOUND = 'operation-not-found',
}

registerEnumType(ErrorCode, {
  name: 'ErrorCode',
});
