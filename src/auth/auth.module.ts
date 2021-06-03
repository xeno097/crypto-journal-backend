import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { FirebaseAdminService } from './firebase-admin.service';
import { JwtModule } from '@nestjs/jwt';
import { GqlExceptionFilter } from 'src/shared/filters/graphql-exception.filter';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from 'src/shared/enums/env-keys.enum';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get(EnvKey.ACCESS_TOKEN_SECRET),
          signOptions: {
            expiresIn: configService.get(EnvKey.ACCESS_TOKEN_EXP),
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    FirebaseAdminService,
    GqlExceptionFilter,
  ],
})
export class AuthModule {}
