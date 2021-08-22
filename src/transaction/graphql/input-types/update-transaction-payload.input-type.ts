import { Field, ID, InputType } from '@nestjs/graphql';
import { IUpdateTransactionPayoadDto } from 'src/transaction/interfaces/dtos/update-transaction-payload-dto.interface';

const UpdateTransactionPayloadInputTypeName = 'UpdateTransactionPayload';

@InputType(UpdateTransactionPayloadInputTypeName)
export class UpdateTransactionPayloadInputType
  implements IUpdateTransactionPayoadDto {
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

  @Field(() => ID, { nullable: true })
  cryptoCurrency?: string;
}
