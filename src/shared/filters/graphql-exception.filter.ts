import { ArgumentsHost } from '@nestjs/common';
import { Catch, ExceptionFilter, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLType } from 'graphql';
import { getError } from '../graphql/utils/get-graphql-error.util';

@Catch()
export class GraphqlExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const { returnType } = host.getArgs().pop();

    if (isGraphQLListType((returnType as GraphQLType).toString())) {
      return [getError(exception)];
    }

    return getError(exception);
  }
}

export const GqlExceptionFilter: Provider = {
  provide: APP_FILTER,
  useClass: GraphqlExceptionFilter,
};

const isGraphQLListType = (type: string): boolean => {
  // Regex to match any string between []
  const matches = type.match(/^\[[a-z]*.\]/gi);

  return !!matches;
};
