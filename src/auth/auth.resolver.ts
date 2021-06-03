import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FieldName } from 'src/shared/enums/input-fields.enum';
import { getError } from 'src/shared/graphql/utils/get-graphql-error.util';
import { AuthService } from './auth.service';
import { AuthResult } from './graphql/union-types/auth-result.union-type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResult)
  public async signIn(
    @Args(FieldName.INPUT) token: string,
  ): Promise<typeof AuthResult> {
    try {
      const [err, res] = await this.authService.signIn({ token });

      if (err) {
        return getError(err);
      }

      return res;
    } catch (error) {
      return getError(error);
    }
  }
}
