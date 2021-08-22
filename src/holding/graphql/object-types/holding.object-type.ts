import { ObjectType } from '@nestjs/graphql';
import { IHoldingDto } from 'src/holding/interfaces/holding-dto.interface';

export const holdingTypeName = 'Holding';

@ObjectType(holdingTypeName)
export class HoldingType implements IHoldingDto {
  id: string;
  holding: number;
  symbol: string;
  name: string;
  icon?: string;
  value: number;
  price: number;
}
