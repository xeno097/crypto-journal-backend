import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperationEntity } from './database/operation.entity';
import { OperationDto } from './dtos/operation.dto';

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
        throw new Error();
      }

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async getOneEntity(
    getOneEntityDto: any,
  ): Promise<[Error, OperationDto]> {
    try {
      const result = await this._getOneEntity(getOneEntityDto);

      return [null, OperationEntity.toDto(result)];
    } catch (error) {
      return [error, null];
    }
  }

  public async getEntities() {
    try {
    } catch (error) {}
  }

  public async countEntities(filter = {}) {
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

  public async aggregateEntities() {
    try {
    } catch (error) {}
  }

  public async createEntity() {
    try {
    } catch (error) {}
  }

  public async updateEntity() {
    try {
    } catch (error) {}
  }

  public async deleteOneEntity() {
    try {
    } catch (error) {}
  }
}
