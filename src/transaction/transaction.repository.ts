import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { EntityNotFoundError } from 'src/errors/shared/entity-not-found.error';
import { TransactionEntity } from './database/transaction.entity';
import { CreateTransactionDto } from './dtos/create/create-transaction.dto';
import { TransactionDto } from './dtos/transaction.dto';
import { UpdateTransactionDto } from './dtos/update/update-transaction.dto';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectModel(TransactionEntity.name)
    private readonly userModel: Model<TransactionEntity>,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: any,
  ): Promise<TransactionEntity> {
    try {
      const entity = await this.userModel.findOne(getOneEntityDto);

      if (!entity) {
        throw new EntityNotFoundError('Transaction');
      }

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async getOneEntity(
    getOneEntityDto: any,
  ): Promise<[BaseError, TransactionDto]> {
    try {
      const result = await this._getOneEntity(getOneEntityDto);

      return [null, TransactionEntity.toDto(result)];
    } catch (error) {
      return [error, null];
    }
  }

  public async getEntities(
    filter = {},
  ): Promise<[BaseError, TransactionDto[]]> {
    try {
      const res = await this.userModel.find(filter);

      return [
        null,
        res.map(el => {
          return TransactionEntity.toDto(el);
        }),
      ];
    } catch (error) {
      return [error, null];
    }
  }

  public async countEntities(filter = {}): Promise<[BaseError, number]> {
    try {
      const result = await this.userModel.count(filter);

      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }

  public async aggregateEntities(pipeline: any[]): Promise<[BaseError, any]> {
    try {
      const result = await this.userModel.aggregate(pipeline);

      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }

  public async createEntity(
    createEntityDto: CreateTransactionDto,
  ): Promise<[BaseError, TransactionDto]> {
    try {
      const newEntity = new this.userModel(createEntityDto);

      await newEntity.save();

      return [null, TransactionEntity.toDto(newEntity)];
    } catch (error) {
      return [error, null];
    }
  }

  public async updateEntity(
    updateEntityDto: UpdateTransactionDto,
  ): Promise<[BaseError, TransactionDto]> {
    try {
      const { getOneEntityDto, updateEntityPayload } = updateEntityDto;

      const entityToUpdate = await this._getOneEntity(getOneEntityDto);

      entityToUpdate.set(updateEntityPayload);

      await entityToUpdate.save();

      return [null, TransactionEntity.toDto(entityToUpdate)];
    } catch (error) {
      return [error, null];
    }
  }

  public async deleteOneEntity(
    getOneEntityDto: any,
  ): Promise<[BaseError, TransactionDto]> {
    try {
      const deletedEntity = await this._getOneEntity(getOneEntityDto);

      await deletedEntity.delete();

      return [null, TransactionEntity.toDto(deletedEntity)];
    } catch (error) {
      return [error, null];
    }
  }
}
