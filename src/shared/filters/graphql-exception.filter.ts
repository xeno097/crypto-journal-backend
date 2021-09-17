import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { Response } from 'express';
import { GraphQLType } from 'graphql';
import { getError } from '../graphql/utils/get-graphql-error.util';

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

const isGraphQLListType = (type: string): boolean => {
  // Regex to match any string between []
  const matches = type.match(/^\[[a-z]*.\]/gi);

  return !!matches;
};
