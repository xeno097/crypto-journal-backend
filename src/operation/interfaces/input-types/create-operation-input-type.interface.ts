import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface ICreateOperationInput {
  name: string;
  type: OperationType;
}
