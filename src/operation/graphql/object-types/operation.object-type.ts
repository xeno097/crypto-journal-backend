import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OperationType as OperationTypeEnum } from 'src/operation/enums/operation-type.enum';
import { IOperationDto } from 'src/operation/interfaces/dtos/operation-dto.interface';

export const operationTypeName = 'Operation';

@ObjectType(operationTypeName)
export class OperationType implements IOperationDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(() => OperationTypeEnum)
  type: OperationTypeEnum;
}
