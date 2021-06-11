import { OperationType } from '../enums/operation-type.enum';
import { IOperationDto } from '../interfaces/dtos/operation-dto.interface';

export class OperationDto implements IOperationDto {
  id: string;
  name: string;
  slug: string;
  type: OperationType;
}
