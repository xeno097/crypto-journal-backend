import { Field, InputType, Int } from '@nestjs/graphql';
import { IFilterDto } from 'src/shared/interfaces/filter-input.interface';

const FilterInputTypeName = 'FilterInput';

@InputType(FilterInputTypeName)
export class FilterInputType implements IFilterDto {
  @Field(() => Int, { defaultValue: 0 })
  start: number;

  @Field(() => Int, { defaultValue: 30 })
  limit: number;

  where: Record<string, any>;
}

export const defaultFilterInputValue: FilterInputType = {
  limit: 30,
  start: 0,
  where: {},
};
