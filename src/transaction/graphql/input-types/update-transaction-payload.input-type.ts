import { Field, ID, InputType } from '@nestjs/graphql';
import { IUpdateTransactionPayloadInputType } from 'src/transaction/interfaces/input-types/update-transaction-payload-input-type.interface';

const UpdateTransactionPayloadInputTypeName = 'UpdateTransactionPayload';

@InputType(UpdateTransactionPayloadInputTypeName)
export class UpdateTransactionPayloadInputType
  implements IUpdateTransactionPayloadInputType {
  @Field({ nullable: true })
  coinSymbol?: string;

  @Field({ nullable: true })
  coins?: number;

  @Field({ nullable: true })
  fee?: number;

  @Field({ nullable: true })
  coinPrice?: number;

  @Field({ nullable: true })
  date?: string;

  @Field(() => ID, { nullable: true })
  operation?: string;
}
