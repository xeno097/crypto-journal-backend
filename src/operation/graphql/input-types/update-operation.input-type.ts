import { Field, InputType } from '@nestjs/graphql';
import { GetObjectByIdInput } from 'src/shared/graphql/input-types/get-object-by-id.input-type';
import { IUpdateEntityInput } from 'src/shared/interfaces/update-entity-input-type.interface';
import { UpdateOperationPayload } from './update-operation.payload';

@InputType()
export class UpdateOperationInput implements IUpdateEntityInput {
  @Field()
  where: GetObjectByIdInput;

  @Field()
  data: UpdateOperationPayload;
}
