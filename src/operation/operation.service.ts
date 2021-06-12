import { Injectable } from '@nestjs/common';
import { GetEntityByIdDto } from 'src/shared/dtos/get-entity-by-id.dto';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { OperationDto } from './dtos/operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';
import { OperationRepository } from './operation.repository';

@Injectable()
export class OperationService {
  constructor(private readonly operationRepository: OperationRepository) {}

  public async getOperationById(
    getOperationByIdDto: GetEntityByIdDto,
  ): Promise<[Error, OperationDto]> {
    try {
      const res = await this.operationRepository.getOneEntity(
        getOperationByIdDto,
      );

      return res;
    } catch (error) {
      return [error, null];
    }
  }

  public async getOperations(): Promise<[Error, OperationDto[]]> {
    try {
      const res = await this.operationRepository.getEntities();

      return res;
    } catch (error) {
      return [error, null];
    }
  }

  public async createOperation(
    createOperationDto: CreateOperationDto,
  ): Promise<[Error, OperationDto]> {
    try {
      const res = await this.operationRepository.createEntity(
        createOperationDto,
      );

      return res;
    } catch (error) {
      return [error, null];
    }
  }

  public async updateOperation(
    updateOperationDto: UpdateOperationDto,
  ): Promise<[Error, OperationDto]> {
    try {
      const res = await this.operationRepository.updateEntity(
        updateOperationDto,
      );

      return res;
    } catch (error) {
      return [error, null];
    }
  }

  public async deleteOperationById(
    getOperationByIdDto: GetEntityByIdDto,
  ): Promise<[Error, OperationDto]> {
    try {
      const res = await this.operationRepository.deleteOneEntity(
        getOperationByIdDto,
      );

      return res;
    } catch (error) {
      return [error, null];
    }
  }
}
