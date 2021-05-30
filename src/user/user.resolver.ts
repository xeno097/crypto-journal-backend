import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FieldName } from 'src/shared/graphql/enums/input-fields.enum';
import { CreateUserInput } from './graphql/input-types/create-user.input-type';
import { UpdateUserInput } from './graphql/input-types/update-user.input-type';
import { UserResult } from './graphql/union-types/user-result.union-type';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserResult)
  public async getUserById(
    @Args(FieldName.ID) id: string,
  ): Promise<typeof UserResult> {
    try {
      const res = await this.userService.getUserById({ id });

      return res;
    } catch (error) {}
  }

  @Query(() => [UserResult])
  public async getUsers(): Promise<Array<typeof UserResult>> {
    try {
      const result = await this.userService.getUsers();

      return result;
    } catch (error) {}
  }

  @Mutation(() => UserResult)
  public async createUser(
    @Args(FieldName.INPUT) createUserInput: CreateUserInput,
  ): Promise<typeof UserResult> {
    try {
      const result = await this.userService.createUser(createUserInput);

      return result;
    } catch (error) {}
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

      const result = await this.userService.updateUser(updateUserDto);

      return result;
    } catch (error) {}
  }

  @Mutation(() => UserResult)
  public async deleteUser(
    @Args(FieldName.ID) id: string,
  ): Promise<typeof UserResult> {
    try {
      const res = await this.userService.deleteUserById({ id });

      return res;
    } catch (error) {}
  }
}
