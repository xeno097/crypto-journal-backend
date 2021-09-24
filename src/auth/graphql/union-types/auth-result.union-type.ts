import { createUnionType } from '@nestjs/graphql';
import { ApiError } from 'src/shared/graphql/object-types/api-error.object-type';
import { AuthPayloadType } from '../object-types/auth-payload.object-type';

export const AuthResultTypeName = 'AuthResult';

export const AuthResult = createUnionType({
  name: AuthResultTypeName,
  types: () => [AuthPayloadType, ApiError],
  resolveType: value => {
    if (value instanceof ApiError) {
      return ApiError;
    }

    return AuthPayloadType;
  },
});
