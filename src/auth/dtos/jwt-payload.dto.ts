import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { IJwtPayloadDto } from '../interfaces/dtos/jwt-payload-dto.interface';

export class JwtPayloadDto implements IJwtPayloadDto {
  id: string;
  email: string;
  role: UserRoles;
}
