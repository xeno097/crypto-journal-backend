import { OperationType } from '../enums/operation-type.enum';
import { ICreateOperationDto } from '../interfaces/dtos/create-operation-dto.interface';

export class CreateOperationDto implements ICreateOperationDto {
  name: string;
  slug: string;
  type: OperationType;
}
