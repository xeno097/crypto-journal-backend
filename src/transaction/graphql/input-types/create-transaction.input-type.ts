import { Field, ID, InputType } from '@nestjs/graphql';
import { OperationType } from 'src/operation/enums/operation-type.enum';
import { ICreateTransactionDto } from 'src/transaction/interfaces/dtos/create-transaction-dto.interface';

const CreateTransactionInputTypeName = 'CreateTransactionInput';

@InputType(CreateTransactionInputTypeName)
export class CreateTransactionInputType implements ICreateTransactionDto {
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

  operationType: OperationType;
  user: string;
}
