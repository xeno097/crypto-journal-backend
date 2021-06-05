import { Field, InputType } from '@nestjs/graphql';
import { IUpdateUserPayloadInput } from 'src/user/interfaces/input-types/update-user-payload.interface';

@InputType()
export class UpdateUserPayloadInput implements IUpdateUserPayloadInput {
  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  blocked?: boolean;
}
