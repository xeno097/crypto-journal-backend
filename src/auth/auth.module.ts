import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { FirebaseAdminService } from './firebase-admin.service';
import { GqlExceptionFilter } from 'src/shared/filters/graphql-exception.filter';
import { CommonJwtModule } from 'src/common-jwt/common-jwt.module';

@Module({
  imports: [UserModule, CommonJwtModule],
  providers: [
    AuthService,
    AuthResolver,
    FirebaseAdminService,
    GqlExceptionFilter,
  ],
})
export class AuthModule {}
