import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './database/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
  ) {}

  private async _getOneEntity(getOneEntityDto: any): Promise<UserEntity> {
    try {
      const entity = await this.userModel.findOne(getOneEntityDto);

      if (!entity) {
        throw new Error('User not found');
      }

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async getOneEntity(getOneEntityDto: any): Promise<UserDto> {
    try {
      const res = await this._getOneEntity(getOneEntityDto);

      return res.toDto();
    } catch (error) {
      throw error;
    }
  }

  public async getEntities(filter = {}): Promise<UserDto[]> {
    try {
      const res = await this.userModel.find(filter);

      return res.map(el => {
        return el.toDto();
      });
    } catch (error) {
      throw error;
    }
  }

  public async countEntities(filter = {}): Promise<number> {
    try {
      const result = await this.userModel.count(filter);

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async aggregateEntities(pipeline: any[]): Promise<any> {
    try {
      const result = await this.userModel.aggregate(pipeline);

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createEntity(createEntityDto: CreateUserDto): Promise<UserDto> {
    try {
      const newEntity = new this.userModel(createEntityDto);

      await newEntity.save();

      return newEntity.toDto();
    } catch (error) {
      throw error;
    }
  }

  public async updateEntity(updateEntityDto: UpdateUserDto): Promise<UserDto> {
    try {
      const { getOneEntityDto, updateEntityPayload } = updateEntityDto;

      const updatedEntity = await this.userModel.findOneAndUpdate(
        getOneEntityDto,
        updateEntityPayload,
        {
          new: true,
        },
      );

      if (!updatedEntity) {
        throw new Error('User not found');
      }

      return updatedEntity.toDto();
    } catch (error) {
      throw new error();
    }
  }

  public async deleteOneEntity(getOneEntityDto: any): Promise<UserDto> {
    try {
      const deletedEntity = await this._getOneEntity(getOneEntityDto);

      await deletedEntity.delete();

      return deletedEntity.toDto();
    } catch (error) {
      throw error;
    }
  }
}
