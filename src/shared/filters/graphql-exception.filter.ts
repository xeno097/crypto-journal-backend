import { ArgumentsHost } from '@nestjs/common';
import { Catch, ExceptionFilter, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLType } from 'graphql';
import { getError } from '../graphql/utils/get-graphql-error.util';
import { Response } from 'express';
import { GqlContextType } from '@nestjs/graphql';

@Catch()
export class GraphqlExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === 'graphql') {
      return this.graphqlHandler(exception, host);
    }

    return this.httpHandler(exception, host);
  }

  private httpHandler(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.status(400).send(exception);
  }

  private graphqlHandler(exception: any, host: ArgumentsHost) {
    const { returnType } = host.getArgs().pop();
    if (
      (returnType as GraphQLType)?.toString &&
      isGraphQLListType((returnType as GraphQLType).toString())
    ) {
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
