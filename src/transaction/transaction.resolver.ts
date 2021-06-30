import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtPayloadDto } from 'src/auth/dtos/jwt-payload.dto';
import { AuthorizedRoles } from 'src/shared/decorators/authorized-roles.decorator';
import { GqlJwtPayload } from 'src/shared/decorators/jwt-payload.decorator';
import { GetSelfEntityByIdDto } from 'src/shared/dtos/get-own-entity-by-id.dto';
import { FieldName } from 'src/shared/enums/input-fields.enum';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { idFieldOptions } from 'src/user/graphql/options/id-input-field.options';
import { AuthorizedCreateTransactionDto } from './dtos/authorized-create-transaction.dto';
import { AuthorizedUpdateTransactionDto } from './dtos/update/authorized-update-transaction.dto';
import { CreateTransactionInputType } from './graphql/input-types/create-transaction.input-type';
import { UpdateTransactionInputType } from './graphql/input-types/update-transaction.input-type';
import { TransactionResult } from './graphql/union-types/transaction-result.union-type';
import { TransactionService } from './transaction.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => TransactionResult)
  @AuthorizedRoles(UserRoles.ADMIN)
  public async getTransactionById(
    @Args(FieldName.ID, idFieldOptions) id: string,
  ): Promise<typeof TransactionResult> {
    const [err, res] = await this.transactionService.getTransactionById({ id });

    if (err) {
      return err;
    }

    return res;
  }

  @Query(() => [TransactionResult])
  @AuthorizedRoles(UserRoles.ADMIN)
  public async getTransactions(): Promise<Array<typeof TransactionResult>> {
    const [err, res] = await this.transactionService.getTransactions();

    if (err) {
      return [err];
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
      return err;
    }

    return res;
  }

  @Mutation(() => TransactionResult)
  public async updateTransaction(
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
    @Args(FieldName.INPUT) updateTransactionInput: UpdateTransactionInputType,
  ): Promise<typeof TransactionResult> {
    const auhtorizedUpdateTransactionDto: AuthorizedUpdateTransactionDto = {
      jwtPayloadDto,
      operationDto: updateTransactionInput,
    };

    const [err, res] = await this.transactionService.updateTransaction(
      auhtorizedUpdateTransactionDto,
    );

    if (err) {
      return err;
    }

    return res;
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
      return err;
    }

    return res;
  }

  @Query(() => [TransactionResult])
  public async getSelfTransactions(
    @GqlJwtPayload() jwtPayloadDto: JwtPayloadDto,
  ): Promise<Array<typeof TransactionResult>> {
    const { id } = jwtPayloadDto;

    const [err, res] = await this.transactionService.getTransactions({
      user: id,
    });

    if (err) {
      return [err];
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
      return err;
    }

    return res;
  }
}
