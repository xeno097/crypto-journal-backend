import { Field, ID, InputType } from '@nestjs/graphql';
import { ICreateTransactionInputType } from 'src/transaction/interfaces/input-types/create-transaction-input-type.interface';

const CreateTransactionInputTypeName = 'CreateTransactionInput';

@InputType(CreateTransactionInputTypeName)
export class CreateTransactionInputType implements ICreateTransactionInputType {
  @Field()
  coinSymbol: string;

  @Field()
  coins: number;

  @Field({ defaultValue: 0 })
  fee: number;

  @Field()
  coinPrice: number;

  @Field()
  date: string;

  @Field(() => ID)
  operation: string;
}
