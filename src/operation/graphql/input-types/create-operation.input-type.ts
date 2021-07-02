import { Field, InputType } from '@nestjs/graphql';
import { OperationType } from 'src/operation/enums/operation-type.enum';
import { ICreateOperationInputType } from 'src/operation/interfaces/input-types/create-operation-input-type.interface';

const CreateOperationInputTypeName = 'CreateOperationInput';

@InputType(CreateOperationInputTypeName)
export class CreateOperationInputType implements ICreateOperationInputType {
  @Field()
  name: string;

  @Field(() => OperationType)
  type: OperationType;
}
