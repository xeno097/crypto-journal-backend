import { ArgsOptions } from '@nestjs/graphql';
import { defaultFilterInputValue } from '../input-types/filter-input.input-type';

export const filterInputFieldOptions: ArgsOptions = {
  defaultValue: defaultFilterInputValue,
};
