import { OperationType } from 'src/operation/enums/operation-type.enum';

export interface ICreateOperationDto {
  name: string;
  slug: string;
  type: OperationType;
}
