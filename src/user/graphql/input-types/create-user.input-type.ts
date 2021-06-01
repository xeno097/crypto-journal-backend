import { Field, InputType } from '@nestjs/graphql';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { ICreateUserInput } from 'src/user/interfaces/input-types/create-user-input-type.interface';

@InputType()
export class CreateUserInput implements ICreateUserInput {
  @Field()
  userName: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field()
  email: string;

  @Field(() => UserRoles)
  role: UserRoles;
}
