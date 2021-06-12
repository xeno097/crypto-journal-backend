import { Field, InputType } from '@nestjs/graphql';
import { OperationType } from 'src/operation/enums/operation-type.enum';
import { IUpdateOperationPayload } from 'src/operation/interfaces/input-types/update-operation-payload.interface';

@InputType()
export class UpdateOperationPayload implements IUpdateOperationPayload {
  @Field({ nullable: true })
  name?: string;

  @Field(() => OperationType, { nullable: true })
  type?: OperationType;
}
