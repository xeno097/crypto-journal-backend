import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtExpiredError } from 'src/errors/auth/jwt-expired.error';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../enums/user-roles.enum';
import { AUTHORIZED_ROLES_KEY } from '../decorators/authorized-roles.decorator';
import { JwtPayloadDto } from 'src/auth/dtos/jwt-payload.dto';
import { UnauthorizedUserError } from 'src/errors/auth/unauthorized-user.error';
import { InvalidJwtFormatError } from 'src/errors/auth/invalid-jwt-format.error';
import { getCustomGqlContext } from '../graphql/utils/get-custom-gql-context.util';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const customGqlContext = getCustomGqlContext(context);

      const { authorization } = customGqlContext;

      const jwtPayload: JwtPayloadDto = this.jwtService.verify(authorization);

      customGqlContext.jwtPayload = jwtPayload;

      const authorized = this.verifyUserRole(jwtPayload, context);

      if (!authorized) {
        throw new UnauthorizedUserError();
      }

      return true;
    } catch (error) {
      if (error.message === 'jwt malformed') {
        throw new InvalidJwtFormatError();
      }

      if (error.message === 'jwt expired') {
        throw new JwtExpiredError();
      }

      throw new UnauthorizedUserError();
    }
  }

  private verifyUserRole(
    jwtPayload: JwtPayloadDto,
    context: ExecutionContext,
  ): boolean {
    const authorizedRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      AUTHORIZED_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!authorizedRoles) {
      return true;
    }

    const { role } = jwtPayload;

    const [authorizedRole] = authorizedRoles.filter(authorizedRole => {
      return role === authorizedRole;
    });

    return !!authorizedRole;
  }
}
