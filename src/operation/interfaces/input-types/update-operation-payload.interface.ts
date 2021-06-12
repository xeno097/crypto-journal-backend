import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface IUpdateOperationPayload {
  name?: string;
  type?: OperationType;
}
