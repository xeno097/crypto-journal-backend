import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface IOperationDto {
  id: string;
  name: string;
  slug: string;
  type: OperationType;
}
