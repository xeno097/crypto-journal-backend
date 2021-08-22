import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CryptoCurrencyType } from 'src/crypto-currency/graphql/object-types/crypto-currency.object-type';
import { CryptoCurrencyResult } from 'src/crypto-currency/graphql/union-types/crypto-currency-result.union-type';
import { OperationType } from 'src/operation/enums/operation-type.enum';
import { OperationResult } from 'src/operation/graphql/union-types/operation-result.union-type';
import { ITransactionDto } from 'src/transaction/interfaces/dtos/transaction-dto.interface';

export const transactionTypeName = 'Transaction';

@ObjectType(transactionTypeName)
export class TransactionType implements ITransactionDto {
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

  @Field(() => CryptoCurrencyResult)
  cryptoCurrency: CryptoCurrencyType;

  user: string;

  operationType: OperationType;
}
