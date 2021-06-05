import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { getCustomGqlContext } from '../graphql/utils/get-custom-gql-context.util';

export const GqlJwtPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const customGqlContext = getCustomGqlContext(context);

    return customGqlContext.jwtPayload;
  },
);
