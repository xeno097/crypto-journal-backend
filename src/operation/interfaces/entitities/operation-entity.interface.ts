import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface IOperationEntity {
  name: string;
  slug: string;
  type: OperationType;
}
