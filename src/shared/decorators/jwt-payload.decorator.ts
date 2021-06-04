import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ICustomGqlContext } from '../interfaces/custom-gql-context.interface';

export const GqlJwtPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);

    const customGqlContext: ICustomGqlContext = gqlContext.getContext();

    return customGqlContext.jwtPayload;
  },
);
