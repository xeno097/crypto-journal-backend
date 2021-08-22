import { IHoldingDto } from '../interfaces/holding-dto.interface';

export class HoldingDto implements IHoldingDto {
  id: string;
  holding: number;
  symbol: string;
  name: string;
  icon?: string;
  value: number;
  price: number;
}
