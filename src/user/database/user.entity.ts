import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { UserDto } from '../dtos/user.dto';
import { IUserDto } from '../interfaces/dtos/user-dto.interface';

@Schema({
  collection: 'user',
  timestamps: true,
})
export class UserEntity extends Document implements IUserDto {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ default: null })
  profilePicture?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: UserRoles.USER, enum: UserRoles })
  role: UserRoles;

  @Prop({ default: false })
  blocked: boolean;

  static toDto(input: UserEntity): UserDto {
    return {
      email: input.email,
      role: input.role,
      id: input.id,
      profilePicture: input.profilePicture,
      userName: input.userName,
      blocked: input.blocked,
    };
  }
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);

UserEntitySchema.pre('validate', function(next) {
  if (this.isNew) {
    this.id = this._id;
  }

  next();
});
