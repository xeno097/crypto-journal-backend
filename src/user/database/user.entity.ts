import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { UserDto } from '../dtos/user.dto';
import { IUserEntity } from '../interfaces/entities/user-entity.interface';

@Schema({
  timestamps: true,
})
export class UserEntity extends Document implements IUserEntity {
  @Prop({ required: true })
  userName: string;

  @Prop({ default: null })
  profilePicture?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: UserRoles.USER, enum: UserRoles })
  role: UserRoles;

  static toDto(input: UserEntity): UserDto {
    return {
      email: input.email,
      role: input.role,
      id: input.id,
      profilePicture: input.profilePicture,
      userName: input.userName,
    };
  }
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);
