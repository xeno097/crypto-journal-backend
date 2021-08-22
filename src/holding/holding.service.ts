import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from 'src/auth/dtos/jwt-payload.dto';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { TransactionRepository } from 'src/transaction/transaction.repository';
import { holdingAggregationPipeline } from './database/holding-aggregation-pipeline';
import { HoldingDto } from './dtos/holding.dto';

@Injectable()
export class HoldingService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

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
