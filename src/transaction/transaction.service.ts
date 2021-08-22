import { Injectable } from '@nestjs/common';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { OperationRepository } from 'src/operation/operation.repository';
import { GetEntityByIdDto } from 'src/shared/dtos/get-entity-by-id.dto';
import { GetSelfEntityByIdDto } from 'src/shared/dtos/get-self-entity-by-id.dto';
import { AuthorizedCreateTransactionDto } from './dtos/create/authorized-create-transaction.dto';
import { CreateTransactionDto } from './dtos/create/create-transaction.dto';
import { TransactionDto } from './dtos/transaction.dto';
import { UpdateTransactionDto } from './dtos/update/update-transaction.dto';
import { AuthorizedUpdateTransactionDto } from './dtos/update/authorized-update-transaction.dto';
import { TransactionRepository } from './transaction.repository';
import { CryptoCurrencyRepository } from 'src/crypto-currency/crypto-currency.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly operationRepository: OperationRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly cryptoCurrencyRepository: CryptoCurrencyRepository,
  ) {}

  public async getTransactionById(
    getTransactionByIdDto: GetEntityByIdDto,
  ): Promise<[BaseError, TransactionDto]> {
    const res = await this.transactionRepository.getOneEntity(
      getTransactionByIdDto,
    );

    return res;
  }

  public async getTransactions(
    filter = {},
  ): Promise<[BaseError, TransactionDto[]]> {
    const res = await this.transactionRepository.getEntities(filter);

    return res;
  }

  public async createTransaction(
    authorizedCreateTransactionDto: AuthorizedCreateTransactionDto,
  ): Promise<[BaseError, TransactionDto]> {
    const { jwtPayloadDto, operationDto } = authorizedCreateTransactionDto;
    const { id } = jwtPayloadDto;
    const { operation, coinSymbol } = operationDto;

    const [opErr, op] = await this.operationRepository.getOneEntity({
      id: operation,
    });

    if (opErr) {
      return [opErr, null];
    }

    const [
      cryptoErr,
      cryptoCurrency,
    ] = await this.cryptoCurrencyRepository.getOneEntity({
      symbol: coinSymbol,
    });

    if (cryptoErr) {
      return [opErr, null];
    }

    const createTransactionDto: CreateTransactionDto = {
      ...operationDto,
      operationType: op.type,
      user: id,
      cryptoCurrency: cryptoCurrency.id,
    };

    const res = await this.transactionRepository.createEntity(
      createTransactionDto,
    );

    return res;
  }

  public async updateTransaction(
    authorizedUpdateTransactionDto: AuthorizedUpdateTransactionDto,
  ): Promise<[BaseError, TransactionDto]> {
    const { jwtPayloadDto, operationDto } = authorizedUpdateTransactionDto;
    const { id: user } = jwtPayloadDto;
    const { getOneEntityDto, updateEntityPayload } = operationDto;
    const { id } = getOneEntityDto;

    const { operation } = updateEntityPayload;

    const getSelfTransactionByIdDto: GetSelfEntityByIdDto = {
      id,
      user,
    };

    const updateTransactionDto: UpdateTransactionDto = {
      getOneEntityDto: getSelfTransactionByIdDto,
      updateEntityPayload: {
        ...updateEntityPayload,
      },
    };

    if (operation) {
      return await this._updateTransactionWithOperation(
        updateTransactionDto,
        operation,
      );
    }

    return await this.transactionRepository.updateEntity(updateTransactionDto);
  }

  private async _updateTransactionWithOperation(
    updateTransactionDto: UpdateTransactionDto,
    operation: string,
  ): Promise<[BaseError, TransactionDto]> {
    const [err, op] = await this.operationRepository.getOneEntity({
      id: operation,
    });

    if (err) {
      return [err, null];
    }

    const { type } = op;
    const { getOneEntityDto, updateEntityPayload } = updateTransactionDto;

    const updateTransactionWithOperationDto: UpdateTransactionDto = {
      getOneEntityDto,
      updateEntityPayload: {
        ...updateEntityPayload,
        operation,
        operationType: type,
      },
    };

    const res = await this.transactionRepository.updateEntity(
      updateTransactionWithOperationDto,
    );

    return res;
  }

  public async getSelfTransactionById(
    getSelfTransactionByIdDto: GetSelfEntityByIdDto,
  ): Promise<[BaseError, TransactionDto]> {
    const res = await this.transactionRepository.getOneEntity(
      getSelfTransactionByIdDto,
    );

    return res;
  }

  public async deleteSelfTransactionById(
    getSelfTransactionByIdDto: GetSelfEntityByIdDto,
  ): Promise<[BaseError, TransactionDto]> {
    const res = await this.transactionRepository.deleteOneEntity(
      getSelfTransactionByIdDto,
    );

    return res;
  }
}
