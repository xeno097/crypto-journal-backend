import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OperationResult } from 'src/operation/graphql/union-types/operation-result.union-type';
import { ITransactionType } from 'src/transaction/interfaces/object-types/transaction-object-type.interface';

export const transactionTypeName = 'Transaction';

@ObjectType(transactionTypeName)
export class TransactionType implements ITransactionType {
  @Field(() => ID)
  id: string;

  @Field()
  coinSymbol: string;

  @Field()
  coins: number;

  @Field()
  cost: number;

  @Field()
  fee: number;

  @Field()
  coinPrice: number;

  @Field()
  date: string;

  @Field(() => OperationResult)
  operation: string;
}
