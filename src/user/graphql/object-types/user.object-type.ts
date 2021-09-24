import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { IUserDto } from 'src/user/interfaces/dtos/user-dto.interface';

export const UserTypeName = 'User';

@ObjectType(UserTypeName)
export class UserType implements IUserDto {
  @Field(() => ID)
  id: string;

  @Field()
  userName: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field()
  email: string;

  role: UserRoles;

  blocked: boolean;
}
