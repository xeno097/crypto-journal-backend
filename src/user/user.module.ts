import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserEntitySchema } from './database/user.entity';
import { CommonJwtModule } from 'src/common-jwt/common-jwt.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserEntitySchema,
      },
    ]),
    CommonJwtModule,
  ],
  providers: [UserService, UserResolver, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
