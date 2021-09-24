import { Field, ObjectType } from '@nestjs/graphql';
import { IAuthPayloadDto } from 'src/auth/interfaces/dtos/auth-payload-dto.interface';
import { UserType } from 'src/user/graphql/object-types/user.object-type';

export const authTypeName = 'AuthPayload';

@ObjectType(authTypeName)
export class AuthPayloadType implements IAuthPayloadDto {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserType)
  user: UserType;
}
