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
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { JwtPayloadDto } from 'src/auth/dtos/jwt-payload.dto';
import { UpdateTransactionPayloadDto } from './dtos/update/update-transaction-payload.dto';

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
    filter: FilterDto,
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

    const { operation, cryptoCurrency } = updateEntityPayload;

    const getSelfTransactionByIdDto: GetSelfEntityByIdDto = {
      id,
      user,
    };

    let updateTransactionPayloadDto: UpdateTransactionPayloadDto = {
      ...updateEntityPayload,
    };

    if (operation) {
      const [
        err,
        updateWithOperation,
      ] = await this._updateTransactionWithOperation(
        updateTransactionPayloadDto,
        operation,
      );

      if (err) {
        return [err, null];
      }

      updateTransactionPayloadDto = { ...updateWithOperation };
    }

    if (cryptoCurrency) {
      const [
        err,
        updateWithCrypto,
      ] = await this._getUpdateTransactionPayloadWithCryptoCurrency(
        updateEntityPayload,
        cryptoCurrency,
      );

      if (err) {
        return [err, null];
      }

      updateTransactionPayloadDto = { ...updateWithCrypto };
    }

    const updateTransactionDto: UpdateTransactionDto = {
      getOneEntityDto: getSelfTransactionByIdDto,
      updateEntityPayload: {
        ...updateTransactionPayloadDto,
      },
    };

    return await this.transactionRepository.updateEntity(updateTransactionDto);
  }

  private async _updateTransactionWithOperation(
    updateTransactionPayloadDto: UpdateTransactionPayloadDto,
    operation: string,
  ): Promise<[BaseError, UpdateTransactionPayloadDto]> {
    const [err, op] = await this.operationRepository.getOneEntity({
      id: operation,
    });

    if (err) {
      return [err, null];
    }

    const { type } = op;

    const updateTransactionWithOperationDto: UpdateTransactionPayloadDto = {
      ...updateTransactionPayloadDto,
      operation,
      operationType: type,
    };

    return [null, updateTransactionWithOperationDto];
  }

  private async _getUpdateTransactionPayloadWithCryptoCurrency(
    updateTransactionPayloadDto: UpdateTransactionPayloadDto,
    cryptoCurrency: string,
  ): Promise<[BaseError, UpdateTransactionPayloadDto]> {
    const [err, currency] = await this.cryptoCurrencyRepository.getOneEntity({
      symbol: cryptoCurrency,
    });

    if (err) {
      return [err, null];
    }

    const { id, symbol } = currency;

    const updateTransactionWithOperationDto: UpdateTransactionPayloadDto = {
      ...updateTransactionPayloadDto,
      coinSymbol: symbol,
      cryptoCurrency: id,
    };

    return [null, updateTransactionWithOperationDto];
  }

  public async getSelfTransactionById(
    getTransactionByIdDto: GetEntityByIdDto,
    jwtPayloadDto: JwtPayloadDto,
  ): Promise<[BaseError, TransactionDto]> {
    const { id } = getTransactionByIdDto;
    const { id: user } = jwtPayloadDto;

    const getSelfTransactionByIdDto: GetSelfEntityByIdDto = {
      id,
      user,
    };

    const res = await this.transactionRepository.getOneEntity(
      getSelfTransactionByIdDto,
    );

    return res;
  }

  public async getSelfTransactions(
    filter: FilterDto,
    jwtPayloadDto: JwtPayloadDto,
  ): Promise<[BaseError, TransactionDto[]]> {
    const { id } = jwtPayloadDto;

    const res = await this.getTransactions({
      ...filter,
      where: { user: id },
    });

    return res;
  }

  public async deleteSelfTransactionById(
    getTransactionByIdDto: GetEntityByIdDto,
    jwtPayloadDto: JwtPayloadDto,
  ): Promise<[BaseError, TransactionDto]> {
    const { id } = getTransactionByIdDto;
    const { id: user } = jwtPayloadDto;

    const deleteTransactionDto: GetSelfEntityByIdDto = {
      id,
      user,
    };

    const res = await this.transactionRepository.deleteOneEntity(
      deleteTransactionDto,
    );

    return res;
  }
}
