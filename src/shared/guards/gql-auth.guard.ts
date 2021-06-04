import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InvalidJwtFormatError } from 'src/errors/invalid-jwt-format.error';
import { ICustomGqlContext } from '../interfaces/custom-gql-context.interface';
import { JwtExpiredError } from 'src/errors/jwt-expired.error';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../enums/user-roles.enum';
import { AUTHORIZED_ROLES_KEY } from '../decorators/authorized-roles.decorator';
import { JwtPayloadDto } from 'src/auth/dtos/jwt-payload.dto';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const gqlContext = GqlExecutionContext.create(context);

      const customGqlContext: ICustomGqlContext = gqlContext.getContext();

      const { authorization } = customGqlContext;

      const jwtPayload: JwtPayloadDto = this.jwtService.verify(authorization);

      customGqlContext.jwtPayload = jwtPayload;

      const authorizedRoles = this.reflector.getAllAndOverride<UserRoles[]>(
        AUTHORIZED_ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      const { role } = jwtPayload;

      if (authorizedRoles) {
        const [authorizedRole] = authorizedRoles.filter(authorizedRole => {
          return role === authorizedRole;
        });
        return !!authorizedRole;
      }

      return true;
    } catch (error) {
      if (error.message === 'jwt malformed') {
        throw new InvalidJwtFormatError();
      }

      if (error.message === 'jwt expired') {
        throw new JwtExpiredError();
      }

      return false;
    }
  }
}
