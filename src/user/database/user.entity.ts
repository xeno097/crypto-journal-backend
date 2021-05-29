import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { IBaseEntity } from 'src/shared/interfaces/base-entity.interface';
import { UserDto } from '../dtos/user.dto';
import { IUserEntity } from '../interfaces/entities/user-entity.interface';

@Schema({
  timestamps: true,
})
export class UserEntity extends Document implements IUserEntity, IBaseEntity {
  @Prop({ required: true })
  userName: string;

  @Prop({ default: null })
  profilePicture?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: UserRoles.USER, enum: Object.keys(UserRoles) })
  role: UserRoles;

  toDto(): UserDto {
    return {
      email: this.email,
      role: this.role,
      id: this.id,
      profilePicture: this.profilePicture,
      userName: this.userName,
    };
  }
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
