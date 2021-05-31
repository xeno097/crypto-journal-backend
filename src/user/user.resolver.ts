import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FieldName } from 'src/shared/graphql/enums/input-fields.enum';
import { CreateUserInput } from './graphql/input-types/create-user.input-type';
import { UpdateUserInput } from './graphql/input-types/update-user.input-type';
import { UserResult } from './graphql/union-types/user-result.union-type';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { getError } from 'src/shared/graphql/errors/utils/get-graphql-error.util';

@Resolver()
export class UserResolver {
  // TODO: Error handling for user entity

  // TODO: create tests for user module

  // TODO: add validations to input types

  // TODO: fix repository when filtering by id

  // TODO: create a formatter for mongoose validation errors
  constructor(private readonly userService: UserService) {}

  @Query(() => UserResult)
  public async getUserById(
    @Args(FieldName.ID) id: string,
  ): Promise<typeof UserResult> {
    try {
      const [err, res] = await this.userService.getUserById({ id });

      if (err) {
        return getError(err);
      }

      return res;
    } catch (error) {
      return getError(error);
    }
  }

  @Query(() => [UserResult])
  public async getUsers(): Promise<Array<typeof UserResult>> {
    try {
      const [err, res] = await this.userService.getUsers();

      if (err) {
        return [getError(err)];
      }

      return res;
    } catch (error) {
      return [getError(error)];
    }
  }

  @Mutation(() => UserResult)
  public async createUser(
    @Args(FieldName.INPUT) createUserInput: CreateUserInput,
  ): Promise<typeof UserResult> {
    try {
      const [err, res] = await this.userService.createUser(createUserInput);

      if (err) {
        return getError(err);
      }

      return res;
    } catch (error) {
      return getError(error);
    }
  }

  @Mutation(() => UserResult)
  public async updateUser(
    @Args(FieldName.INPUT) updateUserInput: UpdateUserInput,
  ): Promise<typeof UserResult> {
    try {
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
    } catch (error) {
      return getError(error);
    }
  }

  @Mutation(() => UserResult)
  public async deleteUser(
    @Args(FieldName.ID) id: string,
  ): Promise<typeof UserResult> {
    try {
      const [err, res] = await this.userService.deleteUserById({ id });

      if (err) {
        return getError(err);
      }

      return res;
    } catch (error) {
      return getError(error);
    }
  }
}
