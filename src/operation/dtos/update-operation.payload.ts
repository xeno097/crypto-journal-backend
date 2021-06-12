import { OperationType } from '../enums/operation-type.enum';
import { IUpdateOperationPayloadDto } from '../interfaces/dtos/update-operation-payload.interface';

export class UpdateOperationPayloadDto implements IUpdateOperationPayloadDto {
  name?: string;
  type?: OperationType;
}
