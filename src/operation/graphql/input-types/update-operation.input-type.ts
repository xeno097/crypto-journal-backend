import { Field, InputType } from '@nestjs/graphql';
import { GetObjectByIdInput } from 'src/shared/graphql/input-types/get-object-by-id.input-type';
import { IUpdateEntityInputType } from 'src/shared/interfaces/update-entity-input-type.interface';
import { UpdateOperationPayloadType } from './update-operation.payload';

const UpdateOperationInputTypeName = 'UpdateOperationInput';

@InputType(UpdateOperationInputTypeName)
export class UpdateOperationInputType implements IUpdateEntityInputType {
  @Field()
  where: GetObjectByIdInput;

  @Field()
  data: UpdateOperationPayloadType;
}
