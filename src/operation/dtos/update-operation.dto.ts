import { IUpdateEntityDto } from 'src/shared/interfaces/update-entity-dto.interface';
import { UpdateOperationPayloadDto } from './update-operation.payload';

export class UpdateOperationDto implements IUpdateEntityDto {
  getOneEntityDto: Record<string, any>;
  updateEntityPayload: UpdateOperationPayloadDto;
}
