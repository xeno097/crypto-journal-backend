import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InvalidJwtFormatError } from 'src/errors/invalid-jwt-format.error';
import { ICustomGqlContext } from '../interfaces/custom-gql-context.interface';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const gqlContext = GqlExecutionContext.create(context);

      const customGqlContext: ICustomGqlContext = gqlContext.getContext();

      const { authorization } = customGqlContext;

      const jwtPayload = this.jwtService.verify(authorization);

      customGqlContext.jwtPayload = jwtPayload;

      return true;
    } catch (error) {
      console.log(error);
      if (error.message === 'jwt malformed') {
        throw new InvalidJwtFormatError();
      }

      return false;
    }
  }
}
