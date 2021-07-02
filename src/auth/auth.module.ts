import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { FirebaseAdminService } from './firebase-admin.service';

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthResolver, FirebaseAdminService],
})
export class AuthModule {}
