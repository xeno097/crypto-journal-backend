import { GetEntityByIdDto } from 'src/shared/dtos/get-entity-by-id.dto';
import { IUpdateEntityDto } from 'src/shared/interfaces/update-entity-dto.interface';
import { UpdateUserPayloadDto } from './update-user.payload';

export class UpdateUserDto implements IUpdateEntityDto {
  getOneEntityDto: GetEntityByIdDto;
  updateEntityPayload: UpdateUserPayloadDto;
}
