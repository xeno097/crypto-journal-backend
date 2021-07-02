import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizedRoles } from 'src/shared/decorators/authorized-roles.decorator';
import { FieldName } from 'src/shared/enums/input-fields.enum';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { generateSlug } from 'src/shared/functions/generate-slug/generate-slug.function';
import { getError } from 'src/shared/graphql/utils/get-graphql-error.util';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { idFieldOptions } from 'src/shared/graphql/options/id-input-field.options';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';
import { CreateOperationInputType } from './graphql/input-types/create-operation.input-type';
import { UpdateOperationInputType } from './graphql/input-types/update-operation.input-type';
import { OperationResult } from './graphql/union-types/operation-result.union-type';
import { OperationService } from './operation.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OperationResolver {
  constructor(private readonly operationService: OperationService) {}

  @Query(() => OperationResult)
  public async getOperationById(
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof OperationResult> {
    const [err, res] = await this.operationService.getOperationById({ id });

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Query(() => [OperationResult])
  public async getOperations(): Promise<Array<typeof OperationResult>> {
    const [err, res] = await this.operationService.getOperations();

    if (err) {
      return [getError(err)];
    }

    return res;
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => OperationResult)
  public async createOperation(
    @Args(FieldName.INPUT) createOperationInput: CreateOperationInputType,
  ): Promise<typeof OperationResult> {
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
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => OperationResult)
  public async updateOperation(
    @Args(FieldName.INPUT) updateOperationInput: UpdateOperationInputType,
  ): Promise<typeof OperationResult> {
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
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => OperationResult)
  public async deleteOperation(
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof OperationResult> {
    const [err, res] = await this.operationService.deleteOperationById({
      id,
    });

    if (err) {
      return getError(err);
    }

    return res;
  }
}
