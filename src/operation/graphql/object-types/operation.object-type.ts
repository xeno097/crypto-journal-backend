import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OperationType as OperationTypeEnum } from 'src/operation/enums/operation-type.enum';
import { IOperationType } from 'src/operation/interfaces/object-types/operation-object-type.interface';

export const operationTypeName = 'Operation';

@ObjectType(operationTypeName)
export class OperationType implements IOperationType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(() => OperationTypeEnum)
  type: OperationTypeEnum;
}
