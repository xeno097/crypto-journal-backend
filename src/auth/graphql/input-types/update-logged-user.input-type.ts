import { Field, InputType } from '@nestjs/graphql';
import { IUpdateUserPayloadType } from 'src/user/interfaces/input-types/update-user-payload.interface';

const UpdateLoggedUserInputTypeName = 'UpdateLoggedUserInput';

@InputType(UpdateLoggedUserInputTypeName)
export class UpdateLoggedUserInputType implements IUpdateUserPayloadType {
  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  profilePicture?: string;
}
