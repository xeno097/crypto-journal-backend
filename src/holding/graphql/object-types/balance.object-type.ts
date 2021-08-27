import { Field, ObjectType } from '@nestjs/graphql';
import { IBalanceDto } from 'src/holding/interfaces/balance-dto.interface';

export const balanceTypeName = 'Balance';

@ObjectType(balanceTypeName)
export class BalanceType implements IBalanceDto {
  @Field()
  id: string;

  @Field()
  balance: number;

  @Field()
  cryptoCurrency: string;

  @Field()
  cryptoValue: number;
}
