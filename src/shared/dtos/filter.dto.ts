import { IFilterDto } from '../interfaces/filter-input.interface';

export class FilterDto implements IFilterDto {
  start: number;
  limit: number;
  where: Record<string, any>;
}
