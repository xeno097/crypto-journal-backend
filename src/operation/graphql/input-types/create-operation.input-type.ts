import { Field, InputType } from '@nestjs/graphql';
import { OperationType } from 'src/operation/enums/operation-type.enum';
import { ICreateOperationInput } from 'src/operation/interfaces/input-types/create-operation-input-type.interface';

@InputType()
export class CreateOperationInput implements ICreateOperationInput {
  @Field()
  name: string;

  @Field(() => OperationType)
  type: OperationType;
}
