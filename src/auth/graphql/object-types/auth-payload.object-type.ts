import { Field, ObjectType } from '@nestjs/graphql';
import { IAuthPayloadType } from 'src/auth/interfaces/object-types/auth-payload-object-type.interface';
import { UserType } from 'src/user/graphql/object-types/user.object-type';

export const authTypeName = 'AuthPayload';

@ObjectType(authTypeName)
export class AuthPayloadType implements IAuthPayloadType {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserType)
  user: UserType;
}
