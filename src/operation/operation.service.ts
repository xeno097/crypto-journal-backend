import { Injectable } from '@nestjs/common';
import { BaseError } from 'src/errors/base-error.abstract-error';
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
  ): Promise<[BaseError, OperationDto]> {
    const res = await this.operationRepository.getOneEntity(
      getOperationByIdDto,
    );

    return res;
  }

  public async getOperations(): Promise<[BaseError, OperationDto[]]> {
    const res = await this.operationRepository.getEntities();

    return res;
  }

  public async createOperation(
    createOperationDto: CreateOperationDto,
  ): Promise<[BaseError, OperationDto]> {
    const res = await this.operationRepository.createEntity(createOperationDto);

    return res;
  }

  public async updateOperation(
    updateOperationDto: UpdateOperationDto,
  ): Promise<[BaseError, OperationDto]> {
    const res = await this.operationRepository.updateEntity(updateOperationDto);

    return res;
  }

  public async deleteOperationById(
    getOperationByIdDto: GetEntityByIdDto,
  ): Promise<[BaseError, OperationDto]> {
    const res = await this.operationRepository.deleteOneEntity(
      getOperationByIdDto,
    );

    return res;
  }
}
