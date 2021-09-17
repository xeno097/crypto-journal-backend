import { Field, InputType, Int } from '@nestjs/graphql';
import {
  DEFAULT_FILTER_START,
  DEFAULT_FILTER_LIMIT,
} from 'src/shared/constants/constants';
import { IFilterDto } from 'src/shared/interfaces/filter-input.interface';

const FilterInputTypeName = 'FilterInput';

@InputType(FilterInputTypeName)
export class FilterInputType implements IFilterDto {
  @Field(() => Int, { defaultValue: DEFAULT_FILTER_START })
  start: number;

  @Field(() => Int, { defaultValue: DEFAULT_FILTER_LIMIT })
  limit: number;

  where: Record<string, any>;
}

export const defaultFilterInputValue: FilterInputType = {
  limit: DEFAULT_FILTER_LIMIT,
  start: DEFAULT_FILTER_START,
  where: {},
};
