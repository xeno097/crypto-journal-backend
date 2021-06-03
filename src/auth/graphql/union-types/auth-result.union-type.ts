import { createUnionType } from '@nestjs/graphql';
import { ApiError } from 'src/shared/graphql/object-types/api-error.object-type';
import { AuthPayloadType } from '../object-types/auth-payload.object-type';

export const AuthResult = createUnionType({
  name: 'AuthResult',
  types: () => [AuthPayloadType, ApiError],
  resolveType: value => {
    if (value.code) {
      return ApiError;
    }

    return AuthPayloadType;
  },
});
