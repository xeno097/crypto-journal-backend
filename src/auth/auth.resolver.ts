import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlJwtPayload } from 'src/shared/decorators/jwt-payload.decorator';
import { FieldName } from 'src/shared/enums/input-fields.enum';
import { getError } from 'src/shared/graphql/utils/get-graphql-error.util';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { UserResult } from 'src/user/graphql/union-types/user-result.union-type';
import { AuthService } from './auth.service';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import { UpdateLoggedUserInputType } from './graphql/input-types/update-logged-user.input-type';
import { AuthResult } from './graphql/union-types/auth-result.union-type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResult)
  public async signIn(
    @Args(FieldName.INPUT) token: string,
  ): Promise<typeof AuthResult> {
    const [err, res] = await this.authService.signIn({ token });

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Query(() => UserResult)
  @UseGuards(GqlAuthGuard)
  public async getLoggedUser(
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
  ): Promise<typeof UserResult> {
    const [err, res] = await this.authService.getLoggedUser(jwtPayloadDto);

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Mutation(() => AuthResult)
  public async refreshToken(
    @Args(FieldName.INPUT) token: string,
  ): Promise<typeof AuthResult> {
    const [err, res] = await this.authService.refreshToken({ token });

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Mutation(() => UserResult)
  @UseGuards(GqlAuthGuard)
  public async updateLoggedUser(
    @Args(FieldName.INPUT) updateLoggedUserInput: UpdateLoggedUserInputType,
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
  ): Promise<typeof UserResult> {
    const [err, res] = await this.authService.updateLoggedUser(
      updateLoggedUserInput,
      jwtPayloadDto,
    );

    if (err) {
      return getError(err);
    }

    return res;
  }
}
