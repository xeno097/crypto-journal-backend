import { registerEnumType } from '@nestjs/graphql';

export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 'internal-server-error',
  INVALID_USER_INPUT = 'invalid-user-input',
  INVALID_SIGN_IN_TOKEN = 'invalid-signin-token',
  INVALID_JWT_FORMAT = 'invalid-jwt-format',
  EXPIRED_JWT = 'expired-jwt',
  UNAUTHORIZED_USER = 'unauthorized-user',
  BLOCKED_USER = 'blocked-user',
  ENTITY_NOT_FOUND = 'entity-not-found',
}

registerEnumType(ErrorCode, {
  name: 'ErrorCode',
});
