import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface IUpdateOperationPayloadDto {
  name?: string;
  type?: OperationType;
}
