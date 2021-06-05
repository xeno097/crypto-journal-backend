import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { InvalidTokenError } from 'src/errors/auth/invalid-login-token.error';
import { EnvKey } from 'src/shared/enums/env-keys.enum';
import { UserRoles } from 'src/shared/enums/user-roles.enum';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { IServiceAccountDto } from './interfaces/dtos/service-account-dto.interface';

@Injectable()
export class FirebaseAdminService {
  constructor(private readonly configService: ConfigService) {
    const serviceAccountJson = this.configService.get(
      EnvKey.GOOGLE_SERVICE_ACCOUNT,
    );

    const serviceAccountObject: IServiceAccountDto = JSON.parse(
      serviceAccountJson,
    );

    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: serviceAccountObject.client_email,
        privateKey: serviceAccountObject.private_key,
        projectId: serviceAccountObject.project_id,
      }),
    });
  }

  public async verifyToken(token: string): Promise<CreateUserDto> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      const userName = decodedToken.name;
      const profilePicture = decodedToken.picture;
      const email = decodedToken.email;

      const ret: CreateUserDto = {
        userName,
        email,
        profilePicture,
        role: UserRoles.USER,
      };

      return ret;
    } catch (error) {
      if (
        error.code === 'auth/argument-error' ||
        error.code === 'auth/id-token-expired'
      ) {
        throw new InvalidTokenError();
      }

      throw error;
    }
  }
}
