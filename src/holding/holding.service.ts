import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from 'src/auth/dtos/jwt-payload.dto';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { TransactionRepository } from 'src/transaction/transaction.repository';
import {
  balanceAggregationPipeline,
  BALANCE_DEFAULT_CRYPTO_CURRENCY,
} from './database/balance-aggregation-pipeline';
import { holdingAggregationPipeline } from './database/holding-aggregation-pipeline';
import { BalanceDto } from './dtos/balance.dto';
import { HoldingDto } from './dtos/holding.dto';

@Injectable()
export class HoldingService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async getSelfBalance(
    jwtPayload: JwtPayloadDto,
  ): Promise<[BaseError, BalanceDto]> {
    const { id } = jwtPayload;

    const pipeline = balanceAggregationPipeline(id);

    const [err, balance] = await this.transactionRepository.aggregateEntities<
      BalanceDto
    >(pipeline);

    if (err) {
      return [err, null];
    }

    const [res] = balance;

    const defaultBalance: BalanceDto = {
      id: BALANCE_DEFAULT_CRYPTO_CURRENCY,
      cryptoValue: 0,
      balance: 0,
      cryptoCurrency: BALANCE_DEFAULT_CRYPTO_CURRENCY,
    };

    const ret: BalanceDto = res ?? defaultBalance;

    return [null, ret];
  }

  public async getSelfHoldings(
    jwtPayload: JwtPayloadDto,
  ): Promise<[BaseError, HoldingDto[]]> {
    const { id } = jwtPayload;

    const pipeline = holdingAggregationPipeline(id);

    const res = await this.transactionRepository.aggregateEntities<HoldingDto>(
      pipeline,
    );

    return res;
  }
}
