import { Field, InputType } from '@nestjs/graphql';
import { GetObjectByIdInput } from 'src/shared/graphql/input-types/get-object-by-id.input-type';
import { IUpdateEntityInput } from 'src/shared/interfaces/update-entity-input-type.interface';
import { UpdateUserPayloadInput } from './update-user.payload';

@InputType()
export class UpdateUserInput implements IUpdateEntityInput {
  @Field()
  where: GetObjectByIdInput;

  @Field()
  data: UpdateUserPayloadInput;
}
