import { ArgsOptions, ID } from '@nestjs/graphql';

export const idFieldOptions: ArgsOptions = { type: () => ID };
