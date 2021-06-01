import { IUpdateUserPayloadDto } from '../interfaces/dtos/update-user-payload.interface';

export class UpdateUserPayloadDto implements IUpdateUserPayloadDto {
  profilePicture?: string;
  userName?: string;
}
