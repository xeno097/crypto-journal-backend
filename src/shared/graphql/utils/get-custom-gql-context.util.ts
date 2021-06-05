import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ICustomGqlContext } from 'src/shared/interfaces/custom-gql-context.interface';

export const getCustomGqlContext = (
  context: ExecutionContext,
): ICustomGqlContext => {
  const gqlContext = GqlExecutionContext.create(context);

  const customGqlContext: ICustomGqlContext = gqlContext.getContext();

  return customGqlContext;
};
