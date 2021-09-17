import { Document, Query } from 'mongoose';
import {
  DEFAULT_FILTER_LIMIT,
  DEFAULT_FILTER_START,
} from '../constants/constants';
import { FilterDto } from '../dtos/filter.dto';

export const buildFilterQuery = <E extends Document>(
  query: Query<E[], E>,
  filter: FilterDto,
): Query<E[], E> => {
  const {
    start = DEFAULT_FILTER_START,
    limit = DEFAULT_FILTER_LIMIT,
    where = {},
  } = filter;

  query.where(where);

  query.skip(start);

  const queryLimit =
    limit > 0 && limit <= DEFAULT_FILTER_LIMIT ? limit : DEFAULT_FILTER_LIMIT;
  query.limit(queryLimit);

  return query;
};
