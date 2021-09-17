import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtPayloadDto } from 'src/auth/dtos/jwt-payload.dto';
import { OperationType } from 'src/operation/enums/operation-type.enum';
import { OperationService } from 'src/operation/operation.service';
import { AuthorizedRoles } from 'src/shared/decorators/authorized-roles.decorator';
import { GqlJwtPayload } from 'src/shared/decorators/jwt-payload.decorator';
import { GetEntityByIdDto } from 'src/shared/dtos/get-entity-by-id.dto';
import { GetSelfEntityByIdDto } from 'src/shared/dtos/get-self-entity-by-id.dto';
import { FieldName } from 'src/shared/enums/input-fields.enum';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { getError } from 'src/shared/graphql/utils/get-graphql-error.util';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { idFieldOptions } from 'src/shared/graphql/options/id-input-field.options';
import { AuthorizedCreateTransactionDto } from './dtos/create/authorized-create-transaction.dto';
import { AuthorizedUpdateTransactionDto } from './dtos/update/authorized-update-transaction.dto';
import { CreateTransactionInputType } from './graphql/input-types/create-transaction.input-type';
import { UpdateTransactionInputType } from './graphql/input-types/update-transaction.input-type';
import { TransactionType } from './graphql/object-types/transaction.object-type';
import { TransactionResult } from './graphql/union-types/transaction-result.union-type';
import { TransactionService } from './transaction.service';
import { FilterInputType } from 'src/shared/graphql/input-types/filter-input.input-type';
import { filterInputFieldOptions } from 'src/shared/graphql/options/filter-input-field.options';

@Resolver(() => TransactionType)
@UseGuards(GqlAuthGuard)
export class TransactionResolver {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly operationService: OperationService,
  ) {}

  @Query(() => TransactionResult)
  @AuthorizedRoles(UserRoles.ADMIN)
  public async getTransactionById(
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof TransactionResult> {
    const [err, res] = await this.transactionService.getTransactionById({ id });

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Query(() => [TransactionResult])
  @AuthorizedRoles(UserRoles.ADMIN)
  public async getTransactions(
    @Args(FieldName.INPUT, filterInputFieldOptions)
    filterInput: FilterInputType,
  ): Promise<Array<typeof TransactionResult>> {
    const [err, res] = await this.transactionService.getTransactions(
      filterInput,
    );

    if (err) {
      return [getError(err)];
    }

    return res;
  }

  @Mutation(() => TransactionResult)
  public async createTransaction(
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
    @Args(FieldName.INPUT) createTransactionInput: CreateTransactionInputType,
  ): Promise<typeof TransactionResult> {
    const authorizedCreateTransactionDto: AuthorizedCreateTransactionDto = {
      jwtPayloadDto,
      operationDto: createTransactionInput,
    };

    const [err, res] = await this.transactionService.createTransaction(
      authorizedCreateTransactionDto,
    );

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Mutation(() => TransactionResult)
  public async updateTransaction(
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
    @Args(FieldName.INPUT) updateTransactionInput: UpdateTransactionInputType,
  ): Promise<typeof TransactionResult> {
    const { data, where } = updateTransactionInput;

    const auhtorizedUpdateTransactionDto: AuthorizedUpdateTransactionDto = {
      jwtPayloadDto,
      operationDto: {
        getOneEntityDto: where,
        updateEntityPayload: data,
      },
    };

    const [err, res] = await this.transactionService.updateTransaction(
      auhtorizedUpdateTransactionDto,
    );

    if (err) {
      return getError(err);
    }

    return res;
  }

  // Field Resolvers
  @ResolveField(() => OperationType)
  public async operation(@Parent() parent: TransactionType) {
    const getOperationById: GetEntityByIdDto = {
      id: parent.operation,
    };

    const [err, op] = await this.operationService.getOperationById(
      getOperationById,
    );

    if (err) {
      return getError(err);
    }

    return op;
  }

  // Business logic
  @Query(() => TransactionResult)
  public async getSelfTransactionById(
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof TransactionResult> {
    const { id: user } = jwtPayloadDto;

    const getSelfTransactionByIdDto: GetSelfEntityByIdDto = {
      id,
      user,
    };

    const [err, res] = await this.transactionService.getTransactionById(
      getSelfTransactionByIdDto,
    );

    if (err) {
      return getError(err);
    }

    return res;
  }

  @Query(() => [TransactionResult])
  public async getSelfTransactions(
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
    @Args(FieldName.INPUT, filterInputFieldOptions)
    filterInput: FilterInputType,
  ): Promise<Array<typeof TransactionResult>> {
    const [err, res] = await this.transactionService.getSelfTransactions(
      filterInput,
      jwtPayloadDto,
    );

    if (err) {
      return [getError(err)];
    }

    return res;
  }

  @Mutation(() => TransactionResult)
  public async deleteSelfTransaction(
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof TransactionResult> {
    const { id: user } = jwtPayloadDto;

    const deleteTransactionDto: GetSelfEntityByIdDto = {
      id,
      user,
    };

    const [err, res] = await this.transactionService.deleteSelfTransactionById(
      deleteTransactionDto,
    );

    if (err) {
      return getError(err);
    }

    return res;
  }
}
