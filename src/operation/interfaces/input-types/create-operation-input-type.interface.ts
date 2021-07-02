import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface ICreateOperationInputType {
  name: string;
  type: OperationType;
}
