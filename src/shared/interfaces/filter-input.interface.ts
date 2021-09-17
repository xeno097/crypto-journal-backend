export interface IFilterDto {
  start: number;
  limit: number;
  where: Record<string, any>;
}
