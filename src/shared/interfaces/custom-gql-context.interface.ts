import { IJwtPayloadDto } from 'src/auth/interfaces/dtos/jwt-payload-dto.interface';

export interface ICustomGqlContext {
  authorization: string;
  jwtPayload: IJwtPayloadDto;
  req: Request;
  res: Response;
}
