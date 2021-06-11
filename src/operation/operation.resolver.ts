import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FieldName } from 'src/shared/enums/input-fields.enum';
import { generateSlug } from 'src/shared/functions/generate-slug/generate-slug.function';
import { getError } from 'src/shared/graphql/utils/get-graphql-error.util';
import { idFieldOptions } from 'src/user/graphql/options/id-input-field.options';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';
import { CreateOperationInput } from './graphql/input-types/create-operation.input-type';
import { UpdateOperationInput } from './graphql/input-types/update-operation.input-type';
import { OperationResult } from './graphql/union-types/operation-result.union-type';
import { OperationService } from './operation.service';

@Resolver()
export class OperationResolver {
  constructor(private readonly operationService: OperationService) {}

  @Query(() => OperationResult)
  public async getOperationById(
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof OperationResult> {
    try {
      const [err, res] = await this.operationService.getOperationById({ id });

      if (err) {
        return getError(err);
      }

      return res;
    } catch (error) {
      return getError(error);
    }
  }

  @Query(() => [OperationResult])
  public async getOperations(): Promise<Array<typeof OperationResult>> {
    try {
      const [err, res] = await this.operationService.getOperations();

      if (err) {
        return [getError(err)];
      }

      return res;
    } catch (error) {
      return [getError(error)];
    }
  }

  @Mutation(() => OperationResult)
  public async createOperation(
    @Args(FieldName.INPUT) createOperationInput: CreateOperationInput,
  ): Promise<typeof OperationResult> {
    try {
      const { name, type } = createOperationInput;

      const createOperationDto: CreateOperationDto = {
        name,
        slug: generateSlug([name]),
        type,
      };

      const [err, res] = await this.operationService.createOperation(
        createOperationDto,
      );

      if (err) {
        return getError(err);
      }

      return res;
    } catch (error) {
      return getError(error);
    }
  }

  @Mutation(() => OperationResult)
  public async updateOperation(
    @Args(FieldName.INPUT) updateOperationInput: UpdateOperationInput,
  ): Promise<typeof OperationResult> {
    try {
      const { data, where } = updateOperationInput;

      const updateUserDto: UpdateOperationDto = {
        getOneEntityDto: where,
        updateEntityPayload: data,
      };

      const [err, res] = await this.operationService.updateOperation(
        updateUserDto,
      );

      if (err) {
        return getError(err);
      }

      return res;
    } catch (error) {
      return getError(error);
    }
  }

  @Mutation(() => OperationResult)
  public async deleteOperation(
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof OperationResult> {
    try {
      const [err, res] = await this.operationService.deleteOperationById({
        id,
      });

      if (err) {
        return getError(err);
      }

      return res;
    } catch (error) {
      return getError(error);
    }
  }
}
