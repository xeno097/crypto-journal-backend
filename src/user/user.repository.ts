import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './database/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { EntityNotFoundError } from 'src/errors/shared/entity-not-found.error';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<UserEntity> {
    try {
      const entity = await this.userModel.findOne(getOneEntityDto);

      if (!entity) {
        throw new EntityNotFoundError('User');
      }

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<[BaseError, UserDto]> {
    try {
      const result = await this._getOneEntity(getOneEntityDto);

      return [null, UserEntity.toDto(result)];
    } catch (error) {
      return [error, null];
    }
  }

  public async getEntities(filter = {}): Promise<[BaseError, UserDto[]]> {
    try {
      const res = await this.userModel.find(filter);

      return [
        null,
        res.map(el => {
          return UserEntity.toDto(el);
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
    createEntityDto: CreateUserDto,
  ): Promise<[BaseError, UserDto]> {
    try {
      const newEntity = new this.userModel(createEntityDto);

      await newEntity.save();

      return [null, UserEntity.toDto(newEntity)];
    } catch (error) {
      return [error, null];
    }
  }

  public async updateEntity(
    updateEntityDto: UpdateUserDto,
  ): Promise<[BaseError, UserDto]> {
    try {
      const { getOneEntityDto, updateEntityPayload } = updateEntityDto;

      const entityToUpdate = await this._getOneEntity(getOneEntityDto);

      entityToUpdate.set(updateEntityPayload);

      await entityToUpdate.save();

      return [null, UserEntity.toDto(entityToUpdate)];
    } catch (error) {
      return [error, null];
    }
  }

  public async deleteOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<[BaseError, UserDto]> {
    try {
      const deletedEntity = await this._getOneEntity(getOneEntityDto);

      await deletedEntity.delete();

      return [null, UserEntity.toDto(deletedEntity)];
    } catch (error) {
      return [error, null];
    }
  }
}
