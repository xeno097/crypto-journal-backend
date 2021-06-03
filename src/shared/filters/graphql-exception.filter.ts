import { Catch, ExceptionFilter, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { getError } from '../graphql/utils/get-graphql-error.util';

@Catch()
export class GraphqlExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    return getError(exception);
  }
}

export const GqlExceptionFilter: Provider = {
  provide: APP_FILTER,
  useClass: GraphqlExceptionFilter,
};
