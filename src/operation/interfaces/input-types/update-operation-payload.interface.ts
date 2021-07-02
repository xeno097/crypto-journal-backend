import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface IUpdateOperationPayloadType {
  name?: string;
  type?: OperationType;
}
