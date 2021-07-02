import { Field, InputType } from '@nestjs/graphql';
import { IUpdateUserPayloadInput } from 'src/user/interfaces/input-types/update-user-payload.interface';

const UpdateLoggedUserInputTypeName = 'UpdateLoggedUserInput';

@InputType(UpdateLoggedUserInputTypeName)
export class UpdateLoggedUserInputType implements IUpdateUserPayloadInput {
  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  profilePicture?: string;
}
