import { registerEnumType } from '@nestjs/graphql';

export enum OperationType {
  BUY = 'BUY',
  SELL = 'SELL',
}

registerEnumType(OperationType, {
  name: 'OperationType',
});
