import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { EntityNotFoundError } from 'src/errors/shared/entity-not-found.error';
import { OperationEntity } from './database/operation.entity';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { OperationDto } from './dtos/operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';

@Injectable()
export class OperationRepository {
  constructor(
    @InjectModel(OperationEntity.name)
    private readonly operationModel: Model<OperationEntity>,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<OperationEntity> {
    try {
      const entity = await this.operationModel.findOne(getOneEntityDto);

      if (!entity) {
        throw new EntityNotFoundError('Operation');
      }

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<[BaseError, OperationDto]> {
    try {
      const result = await this._getOneEntity(getOneEntityDto);

      return [null, OperationEntity.toDto(result)];
    } catch (error) {
      return [error, null];
    }
  }

  public async getEntities(filter = {}): Promise<[BaseError, OperationDto[]]> {
    try {
      const res = await this.operationModel.find(filter);

      return [
        null,
        res.map(el => {
          return OperationEntity.toDto(el);
        }),
      ];
    } catch (error) {
      return [error, null];
    }
  }

  public async countEntities(filter = {}): Promise<[BaseError, number]> {
    try {
      const res = await this.operationModel.find(filter).count();

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async aggregateEntities(pipeline: any[]): Promise<[BaseError, any]> {
    try {
      const result = await this.operationModel.aggregate(pipeline);

      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }

  public async createEntity(
    createEntityDto: CreateOperationDto,
  ): Promise<[BaseError, OperationDto]> {
    try {
      const newEntity = new this.operationModel(createEntityDto);

      await newEntity.save();

      return [null, OperationEntity.toDto(newEntity)];
    } catch (error) {
      return [error, null];
    }
  }

  public async updateEntity(
    updateEntityDto: UpdateOperationDto,
  ): Promise<[BaseError, OperationDto]> {
    try {
      const { getOneEntityDto, updateEntityPayload } = updateEntityDto;

      const entityToUpdate = await this._getOneEntity(getOneEntityDto);

      entityToUpdate.set(updateEntityPayload);

      await entityToUpdate.save();

      return [null, OperationEntity.toDto(entityToUpdate)];
    } catch (error) {
      return [error, null];
    }
  }

  public async deleteOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<[BaseError, OperationDto]> {
    try {
      const deletedEntity = await this._getOneEntity(getOneEntityDto);

      await deletedEntity.delete();

      return [null, OperationEntity.toDto(deletedEntity)];
    } catch (error) {
      return [error, null];
    }
  }
}
