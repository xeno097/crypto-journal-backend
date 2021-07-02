import { Field, InputType } from '@nestjs/graphql';
import { GetObjectByIdInput } from 'src/shared/graphql/input-types/get-object-by-id.input-type';
import { IUpdateEntityInput } from 'src/shared/interfaces/update-entity-input-type.interface';
import { UpdateTransactionPayloadInputType } from './update-transaction-payload.input-type';

const UpdateTransactionInputTypeName = 'UpdateTransactionInput';

@InputType(UpdateTransactionInputTypeName)
export class UpdateTransactionInputType implements IUpdateEntityInput {
  @Field()
  where: GetObjectByIdInput;

  @Field()
  data: UpdateTransactionPayloadInputType;
}
