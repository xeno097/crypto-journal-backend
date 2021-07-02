import { Field, InputType } from '@nestjs/graphql';
import { OperationType } from 'src/operation/enums/operation-type.enum';
import { IUpdateOperationPayloadType } from 'src/operation/interfaces/input-types/update-operation-payload.interface';

const UpdateOperationPayloadTypeName = 'UpdateOperationPayload';

@InputType(UpdateOperationPayloadTypeName)
export class UpdateOperationPayloadType implements IUpdateOperationPayloadType {
  @Field({ nullable: true })
  name?: string;

  @Field(() => OperationType, { nullable: true })
  type?: OperationType;
}
