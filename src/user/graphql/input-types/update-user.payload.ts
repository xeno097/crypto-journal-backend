import { Field, InputType } from '@nestjs/graphql';
import { IUpdateUserPayloadType } from 'src/user/interfaces/input-types/update-user-payload.interface';

const UpdateUserPayloadTypeName = 'UpdateUserPayload';

@InputType(UpdateUserPayloadTypeName)
export class UpdateUserPayloadType implements IUpdateUserPayloadType {
  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  blocked?: boolean;
}
