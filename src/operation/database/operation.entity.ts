import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OperationDto } from '../dtos/operation.dto';
import { OperationType } from '../enums/operation-type.enum';
import { IOperationDto } from '../interfaces/dtos/operation-dto.interface';

@Schema({
  collection: 'operation',
  timestamps: true,
})
export class OperationEntity extends Document implements IOperationDto {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, enum: OperationType })
  type: OperationType;

  static toDto(input: OperationEntity): OperationDto {
    return {
      id: input.id,
      name: input.name,
      slug: input.slug,
      type: input.type,
    };
  }
}

export const OperationEntitySchema = SchemaFactory.createForClass(
  OperationEntity,
);

OperationEntitySchema.pre('validate', function(next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
