import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IUserType } from 'src/user/interfaces/object-types/user-object-type.interface';

export const UserTypeName = 'User';

@ObjectType(UserTypeName)
export class UserType implements IUserType {
  @Field(() => ID)
  id: string;

  @Field()
  userName: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field()
  email: string;
}
