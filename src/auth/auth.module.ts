import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { FirebaseAdminService } from './firebase-admin.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXP,
      },
    }),
  ],
  providers: [AuthService, AuthResolver, FirebaseAdminService],
})
export class AuthModule {}
