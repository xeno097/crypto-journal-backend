import { Field, InputType } from '@nestjs/graphql';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { ICreateUserInputType } from 'src/user/interfaces/input-types/create-user-input-type.interface';

const CreateUserInputTypeName = 'CreateUserInput';

@InputType(CreateUserInputTypeName)
export class CreateUserInputType implements ICreateUserInputType {
  @Field()
  userName: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field()
  email: string;

  @Field(() => UserRoles, { nullable: true, defaultValue: UserRoles.USER })
  role?: UserRoles;
}
