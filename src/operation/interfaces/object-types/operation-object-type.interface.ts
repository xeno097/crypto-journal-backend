import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface IOperationType {
  id: string;
  name: string;
  slug: string;
  type: OperationType;
}
