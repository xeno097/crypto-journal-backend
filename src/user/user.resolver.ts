import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FieldName } from 'src/shared/enums/input-fields.enum';
import { CreateUserInput } from './graphql/input-types/create-user.input-type';
import { UpdateUserInput } from './graphql/input-types/update-user.input-type';
import { UserResult } from './graphql/union-types/user-result.union-type';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { getError } from 'src/shared/graphql/utils/get-graphql-error.util';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { AuthorizedRoles } from 'src/shared/decorators/authorized-roles.decorator';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { idFieldOptions } from './graphql/options/id-input-field.options';

@Resolver()
@AuthorizedRoles(UserRoles.ADMIN)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  // TODO: Error handling for user entity

  // TODO: create tests for user module

  // TODO: add validations to input types

  // TODO: create a formatter for mongoose validation errors
  constructor(private readonly userService: UserService) {}

  @Query(() => UserResult)
  public async getUserById(
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof UserResult> {
    const [err, res] = await this.userService.getUserById({ id });

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Query(() => [UserResult])
  public async getUsers(): Promise<Array<typeof UserResult>> {
    const [err, res] = await this.userService.getUsers();

    if (err) {
      return [getError(err)];
    }

    return res;
  }

  @Mutation(() => UserResult)
  public async createUser(
    @Args(FieldName.INPUT) createUserInput: CreateUserInput,
  ): Promise<typeof UserResult> {
    const [err, res] = await this.userService.createUser(createUserInput);

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Mutation(() => UserResult)
  public async updateUser(
    @Args(FieldName.INPUT) updateUserInput: UpdateUserInput,
  ): Promise<typeof UserResult> {
    const { data, where } = updateUserInput;

    const updateUserDto: UpdateUserDto = {
      getOneEntityDto: where,
      updateEntityPayload: data,
    };

    const [err, res] = await this.userService.updateUser(updateUserDto);

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Mutation(() => UserResult)
  public async deleteUser(
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof UserResult> {
    const [err, res] = await this.userService.deleteUserById({ id });

    if (err) {
      return getError(err);
    }

    return res;
  }
}
