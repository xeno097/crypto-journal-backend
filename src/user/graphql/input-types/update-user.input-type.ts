import { Field, InputType } from '@nestjs/graphql';
import { GetObjectByIdInput } from 'src/shared/graphql/input-types/get-object-by-id.input-type';
import { IUpdateEntityInputType } from 'src/shared/interfaces/update-entity-input-type.interface';
import { UpdateUserPayloadType } from './update-user.payload';

const UpdateUserInputTypeName = 'UpdateUserInput';

@InputType(UpdateUserInputTypeName)
export class UpdateUserInputType implements IUpdateEntityInputType {
  @Field()
  where: GetObjectByIdInput;

  @Field()
  data: UpdateUserPayloadType;
}
