import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { OperationNotFoundError } from 'src/errors/operation/operation-not-found.error';
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

  private async _getOneEntity(getOneEntityDto: any): Promise<OperationEntity> {
    try {
      const entity = await this.operationModel.findOne(getOneEntityDto);

      if (!entity) {
        throw new OperationNotFoundError();
      }

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async getOneEntity(
    getOneEntityDto: any,
  ): Promise<[BaseError, OperationDto]> {
    try {
      const result = await this._getOneEntity(getOneEntityDto);

      return [null, OperationEntity.toDto(result)];
    } catch (error) {
      return [error, null];
    }
  }

  public async getEntities(filter = {}): Promise<[Error, OperationDto[]]> {
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

  public async countEntities(filter = {}): Promise<[Error, number]> {
    try {
      const res = await this.operationModel.find(filter).count();

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async aggregateEntities(pipeline: any[]): Promise<[Error, any]> {
    try {
      const result = await this.operationModel.aggregate(pipeline);

      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }

  public async createEntity(
    createEntityDto: CreateOperationDto,
  ): Promise<[Error, OperationDto]> {
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
  ): Promise<[Error, OperationDto]> {
    try {
      const { getOneEntityDto, updateEntityPayload } = updateEntityDto;

      const updatedEntity = await this.operationModel.findOneAndUpdate(
        getOneEntityDto,
        updateEntityPayload,
        {
          new: true,
        },
      );

      if (!updatedEntity) {
        throw new OperationNotFoundError();
      }

      return [null, OperationEntity.toDto(updatedEntity)];
    } catch (error) {
      return [error, null];
    }
  }

  public async deleteOneEntity(
    getOneEntityDto: any,
  ): Promise<[Error, OperationDto]> {
    try {
      const deletedEntity = await this._getOneEntity(getOneEntityDto);

      await deletedEntity.delete();

      return [null, OperationEntity.toDto(deletedEntity)];
    } catch (error) {
      return [error, null];
    }
  }
}
