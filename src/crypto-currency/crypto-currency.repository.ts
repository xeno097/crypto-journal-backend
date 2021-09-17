import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseError } from 'src/errors/base-error.abstract-error';
import { EntityNotFoundError } from 'src/errors/shared/entity-not-found.error';
import { buildFilterQuery } from 'src/shared/database/build-filter-query.util';
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { CryptoCurrencyEntity } from './database/crypto-currency.entity';
import { CreateCryptoCurrencyDto } from './dtos/create-crypto-currency.dto';
import { CryptoCurrencyDto } from './dtos/crypto-currency.dto';
import { SearchCryptoCurrencyDto } from './dtos/search-crypto-currency.dto';
import { UpdateCryptoCurrencyDto } from './dtos/update-crypto-currency.dto';

@Injectable()
export class CryptoCurrencyRepository {
  constructor(
    @InjectModel(CryptoCurrencyEntity.name)
    private readonly cryptoCurrencyModel: Model<CryptoCurrencyEntity>,
  ) {}

  private async _getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<CryptoCurrencyEntity> {
    try {
      const entity = await this.cryptoCurrencyModel.findOne(getOneEntityDto);

      if (!entity) {
        throw new EntityNotFoundError('CryptoCurrency');
      }

      return entity;
    } catch (error) {
      throw error;
    }
  }

  public async getOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<[BaseError, CryptoCurrencyDto]> {
    try {
      const result = await this._getOneEntity(getOneEntityDto);

      return [null, CryptoCurrencyEntity.toDto(result)];
    } catch (error) {
      return [error, null];
    }
  }

  public async getEntities(
    filter: FilterDto,
  ): Promise<[BaseError, CryptoCurrencyDto[]]> {
    try {
      const query = this.cryptoCurrencyModel.find().sort({ price: -1 });

      const res = await buildFilterQuery(query, filter);

      return [
        null,
        res.map(el => {
          return CryptoCurrencyEntity.toDto(el);
        }),
      ];
    } catch (error) {
      return [error, null];
    }
  }

  public async countEntities(filter = {}): Promise<[BaseError, number]> {
    try {
      const res = await this.cryptoCurrencyModel.find(filter).count();

      return [null, res];
    } catch (error) {
      return [error, null];
    }
  }

  public async aggregateEntities(pipeline: any[]): Promise<[BaseError, any]> {
    try {
      const result = await this.cryptoCurrencyModel.aggregate(pipeline);

      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }

  public async createEntity(
    createEntityDto: CreateCryptoCurrencyDto,
  ): Promise<[BaseError, CryptoCurrencyDto]> {
    try {
      const newEntity = new this.cryptoCurrencyModel(createEntityDto);

      await newEntity.save();

      return [null, CryptoCurrencyEntity.toDto(newEntity)];
    } catch (error) {
      return [error, null];
    }
  }

  public async updateEntity(
    updateEntityDto: UpdateCryptoCurrencyDto,
  ): Promise<[BaseError, CryptoCurrencyDto]> {
    try {
      const { getOneEntityDto, updateEntityPayload } = updateEntityDto;

      const entityToUpdate = await this._getOneEntity(getOneEntityDto);

      entityToUpdate.set(updateEntityPayload);

      await entityToUpdate.save();

      return [null, CryptoCurrencyEntity.toDto(entityToUpdate)];
    } catch (error) {
      return [error, null];
    }
  }

  public async deleteOneEntity(
    getOneEntityDto: Record<string, any>,
  ): Promise<[BaseError, CryptoCurrencyDto]> {
    try {
      const deletedEntity = await this._getOneEntity(getOneEntityDto);

      await deletedEntity.delete();

      return [null, CryptoCurrencyEntity.toDto(deletedEntity)];
    } catch (error) {
      return [error, null];
    }
  }

  // Extra
  public async bulkUpdate(
    updateEntitiesDto: UpdateCryptoCurrencyDto[],
  ): Promise<boolean> {
    const bulkOp = updateEntitiesDto.map(update => {
      const { getOneEntityDto, updateEntityPayload } = update;

      return {
        updateOne: {
          filter: getOneEntityDto,
          update: updateEntityPayload,
          upsert: true,
        },
      };
    });

    const res = await this.cryptoCurrencyModel.bulkWrite(bulkOp);

    return !!res;
  }

  public async searchCryptoCurrency(
    input: SearchCryptoCurrencyDto,
  ): Promise<[BaseError, CryptoCurrencyDto[]]> {
    const { searchString } = input;

    const filter: FilterDto = {
      where: { $text: { $search: searchString } },
    };

    return await this.getEntities(filter);
  }
}
